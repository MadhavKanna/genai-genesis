import os
import logging
from typing import List, Dict, Any
from vertexai import generative_models
from google.cloud import aiplatform
from vertexai.language_models import TextEmbeddingModel
from google.cloud.aiplatform.matching_engine import MatchingEngineIndexEndpoint
from dotenv import load_dotenv
import nltk
from nltk.tokenize import sent_tokenize


load_dotenv()

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Initialize Gemini
model = generative_models.GenerativeModel("gemini-pro")

# Initialize Vertex AI
aiplatform.init(project=os.getenv('GOOGLE_CLOUD_PROJECT'))

# Initialize embedding model
embedding_model = TextEmbeddingModel.from_pretrained("textembedding-gecko@latest")



def PromptRAGAugmenter(text: str, max_augmented_sentences: int = 5) -> str:
    """
    Augments a medical text prompt with relevant sentences from the vector database.
    
    Args:
        text: Input text to augment
        max_augmented_sentences: Maximum number of sentences to add (default: 5)
    
    Returns:
        Augmented text with relevant medical context
    """
    try:
        # Download punkt tokenizer data
        nltk.download('punkt')
        
        # Split into sentences using simple split for now
        sentences = text.split('. ')
        logger.info(f"Split text into {len(sentences)} sentences")
        
        # Get the endpoint
        endpoint = aiplatform.MatchingEngineIndexEndpoint(
            index_endpoint_name="projects/933602704740/locations/northamerica-northeast2/indexEndpoints/6334348060268691456"
        )
        
        augmented_sentences = []
        seen_texts = set()
        for sentence in sentences:
            # Generate embedding for the sentence
            query_embedding = embedding_model.get_embeddings([sentence])[0].values
            
            # Find closest neighbor
            matches = endpoint.find_neighbors(
                deployed_index_id="symedon2_name_1742693705325",
                queries=[query_embedding],
                num_neighbors=1,
                return_full_datapoint=True
            )
            
            # Extract the relevant text from restricts
            if matches and matches[0]:
                match = matches[0][0]  # First match of first query
                namespace = match.restricts[0]
                relevant_text = namespace.allow_tokens[0]
                print(relevant_text)
                similarity_score = match.distance
                
                if relevant_text not in seen_texts:
                    seen_texts.add(relevant_text)
                    similarity_score = match.distance
                    
                    augmented_sentences.append({
                        "original": sentence,
                        "relevant": relevant_text,
                        "score": similarity_score
                    })
        
        # Sort by similarity score and take top N
        augmented_sentences.sort(key=lambda x: x["score"], reverse=True)
        top_sentences = augmented_sentences[:max_augmented_sentences]
        
        # Build augmented prompt
        augmented_text = text + "\n\nAdditional medical information:\n"
        for s in top_sentences:
            augmented_text += f"{s['relevant']}\n"
        
        logger.info(f"Added {len(top_sentences)} relevant medical contexts")
        return augmented_text
        
    except Exception as e:
        logger.error(f"Error in PromptRAGAugmenter: {e}")
        return text  # Return original text if augmentation fails

# Example usage
if __name__ == "__main__":
    test_text = """I've been experiencing severe headaches for the past week. The pain is mostly on the right side of my head. 
    Sometimes I also feel nauseous and sensitive to light. I've tried taking over-the-counter pain medication but it doesn't help much."""
    
    augmented_prompt = PromptRAGAugmenter(test_text)
    print("\nOriginal text:")
    print(test_text)
    print("\nAugmented text:")
    print(augmented_prompt)