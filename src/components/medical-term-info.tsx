"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { LucideInfo } from "lucide-react"

interface MedicalTermInfoProps {
  term: string
  children: React.ReactNode
  className?: string
}

// Medical terms dictionary with layman explanations
const medicalTerms: Record<string, string> = {
  // Possible Causes
  "Muscle strain or spasm":
    "When the muscles in your back are stretched too far or torn, causing pain and tightness. It's similar to what happens when you pull a muscle during exercise.",

  "Lumbar disc herniation":
    "The cushion-like discs between your spine bones can bulge out or rupture. Think of it like a jelly donut where the soft inside pushes through a crack in the outer layer, which can press on nearby nerves.",

  "Degenerative disc disease":
    "Normal wear and tear on the discs between your spine bones as you age. The discs dry out, get thinner, and can't absorb shock as well, similar to how a car's shock absorbers wear out over time.",

  "Facet joint dysfunction":
    "Problems with the small joints in your spine that help you bend and twist. These joints can become irritated or damaged, like a door hinge that's worn out and doesn't move smoothly.",

  // Recommended Tests
  "X-ray of the lumbar spine":
    "A simple imaging test that uses radiation to create pictures of the bones in your lower back. It can show bone problems but doesn't show soft tissues like discs or nerves.",

  "MRI if symptoms persist or worsen":
    "A detailed imaging test that uses magnets and radio waves (not radiation) to create pictures of both bones and soft tissues. It's like a more detailed photograph that can show problems with discs, nerves, and other tissues.",

  "Physical examination by a local healthcare provider":
    "A hands-on assessment by a doctor or other healthcare professional who will check your movement, strength, reflexes, and areas of pain to help determine what's causing your symptoms.",

  // Suggested Treatments
  "Physical therapy focusing on core strengthening":
    "Working with a trained therapist to learn specific exercises that strengthen the muscles in your abdomen, lower back, and pelvis. These muscles support your spine like a natural corset.",

  "Over-the-counter pain relievers (NSAIDs)":
    "Non-prescription medications like ibuprofen (Advil, Motrin) or naproxen (Aleve) that reduce pain and inflammation. They work by blocking certain chemicals in your body that cause pain and swelling.",

  "Heat and cold therapy":
    "Using hot or cold packs on the painful area. Heat increases blood flow and relaxes muscles, while cold reduces inflammation and numbs pain, similar to how you might treat a sports injury.",

  "Proper ergonomics and posture correction":
    "Making adjustments to how you sit, stand, and move to reduce strain on your back. This includes things like sitting with proper support, lifting correctly, and setting up your workspace to minimize back stress.",

  // Lifestyle Recommendations
  "Regular low-impact exercise (swimming, walking)":
    "Activities that get you moving without putting too much stress on your joints and spine. These exercises improve strength and flexibility while being gentle on your back.",

  "Maintain healthy weight":
    "Keeping your weight in a healthy range to reduce stress on your spine and back muscles. Extra weight, especially around the middle, can pull your spine out of alignment and cause more pain.",

  "Ergonomic workspace setup":
    "Arranging your desk, chair, computer, and other equipment to support good posture and reduce strain on your back. This includes having your screen at eye level and using a chair that supports your lower back.",

  "Avoid prolonged sitting":
    "Taking breaks from sitting for long periods, as this puts pressure on your spine and can weaken back muscles. Try to stand up, stretch, or walk around for a few minutes every hour.",

  // Other common medical terms
  "Spinal Disk Herniation":
    "The cushion-like disks between your spine bones (vertebrae) can sometimes bulge out or rupture. This is called herniation. It can press on nearby nerves causing pain, numbness, or weakness.",

  Hypertension:
    "Also known as high blood pressure, this is when the force of blood pushing against your artery walls is consistently too high. It often has no symptoms but can lead to serious health problems if untreated.",

  "Myocardial Infarction":
    "Commonly known as a heart attack, this occurs when blood flow to part of the heart muscle is blocked, causing damage. It often feels like pressure or pain in the chest, arm, or jaw.",

  Osteoarthritis:
    "This is the most common form of arthritis, where the protective cartilage that cushions the ends of your bones wears down over time. It causes pain and stiffness in joints, especially in hands, knees, hips, and spine.",

  "Gastroesophageal Reflux Disease":
    "Often called GERD or acid reflux, this occurs when stomach acid frequently flows back into the tube connecting your mouth and stomach (esophagus), causing irritation and a burning sensation in your chest.",

  "Diabetes Mellitus":
    "A group of diseases that affect how your body uses blood sugar (glucose). In diabetes, your body either doesn't make enough insulin or can't effectively use the insulin it makes, causing high blood sugar levels.",

  Bronchitis:
    "An inflammation of the lining of your bronchial tubes, which carry air to and from your lungs. It causes coughing, mucus production, fatigue, shortness of breath, and mild fever.",

  Migraine:
    "A neurological condition that causes intense, debilitating headaches. Symptoms can include throbbing pain, usually on one side of the head, nausea, and sensitivity to light and sound.",

  Pneumonia:
    "An infection that inflames the air sacs in one or both lungs. The air sacs may fill with fluid or pus, causing cough with phlegm, fever, chills, and difficulty breathing.",

  Hypothyroidism:
    "A condition where the thyroid gland doesn't produce enough thyroid hormone. It can cause fatigue, increased sensitivity to cold, constipation, dry skin, and unexplained weight gain.",

  Anemia:
    "A condition where you don't have enough healthy red blood cells to carry adequate oxygen to your body's tissues. This can make you feel tired and weak.",

  Asthma:
    "A condition that affects your airways, which are tubes that carry air in and out of your lungs. It causes wheezing, shortness of breath, chest tightness, and coughing.",

  Arthritis:
    "Inflammation of one or more joints, causing pain and stiffness that can worsen with age. The most common types are osteoarthritis and rheumatoid arthritis.",

  Sinusitis:
    "Inflammation of the sinuses, which are air-filled spaces behind your forehead, cheeks, and eyes. It causes pain, pressure, and sometimes infection.",

  "Urinary Tract Infection":
    "An infection in any part of your urinary system — your kidneys, ureters, bladder, and urethra. Most infections involve the lower urinary tract — the bladder and the urethra.",

  Dermatitis:
    "A general term that describes skin inflammation. It typically causes an itchy rash and swollen, reddened skin.",

  Conjunctivitis:
    "Also known as pink eye, this is inflammation or infection of the transparent membrane that lines your eyelid and covers the white part of your eyeball.",

  Tonsillitis:
    "Inflammation of the tonsils, two oval-shaped pads of tissue at the back of the throat — one on each side.",

  Gastritis: "Inflammation of the lining of the stomach. It can occur suddenly (acute) or gradually (chronic).",

  Sciatica:
    "Pain that radiates along the path of the sciatic nerve, which branches from your lower back through your hips and buttocks and down each leg.",

  Fibromyalgia:
    "A disorder characterized by widespread musculoskeletal pain accompanied by fatigue, sleep, memory and mood issues.",

  Glaucoma:
    "A group of eye conditions that damage the optic nerve, often caused by abnormally high pressure in your eye.",

  Cataracts:
    "A clouding of the normally clear lens of your eye. For people who have cataracts, seeing through cloudy lenses is a bit like looking through a frosty or fogged-up window.",

  Eczema:
    "A condition where patches of skin become inflamed, itchy, red, cracked, and rough. Sometimes blisters may occur.",

  Psoriasis:
    "A skin disease that causes red, itchy scaly patches, most commonly on the knees, elbows, trunk and scalp.",

  Gallstones:
    "Hardened deposits of digestive fluid that can form in your gallbladder. They can range in size from as small as a grain of sand to as large as a golf ball.",

  "Kidney Stones":
    "Hard deposits made of minerals and salts that form inside your kidneys. They can cause severe pain when passing through the urinary tract.",

  "Irritable Bowel Syndrome":
    "A common disorder that affects the large intestine. Signs and symptoms include cramping, abdominal pain, bloating, gas, and diarrhea or constipation, or both.",

  "Crohn's Disease":
    "A type of inflammatory bowel disease that causes inflammation of your digestive tract, which can lead to abdominal pain, severe diarrhea, fatigue, weight loss and malnutrition.",

  "Ulcerative Colitis":
    "An inflammatory bowel disease that causes long-lasting inflammation and ulcers in your digestive tract. It affects the innermost lining of your large intestine and rectum.",
}

export function MedicalTermInfo({ term, children, className = "" }: MedicalTermInfoProps) {
  const [isOpen, setIsOpen] = useState(false)

  // Try to find an exact match first
  let explanation = medicalTerms[term]

  // If no exact match, try to find a partial match
  if (!explanation) {
    const keys = Object.keys(medicalTerms)
    for (const key of keys) {
      if (term.includes(key) || key.includes(term)) {
        explanation = medicalTerms[key]
        break
      }
    }
  }

  // If still no match, provide a generic message
  if (!explanation) {
    explanation =
      "This is a medical term or recommendation. If you're unsure what it means, please ask your healthcare provider for more information."
  }

  return (
    <span className={`inline-flex items-center ${className}`}>
      {children}
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="icon" className="h-5 w-5 ml-1 rounded-full">
            <LucideInfo className="h-3 w-3" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-4">
          <div className="space-y-2">
            <h4 className="font-medium">{term}</h4>
            <p className="text-sm text-muted-foreground">{explanation}</p>
          </div>
        </PopoverContent>
      </Popover>
    </span>
  )
}

