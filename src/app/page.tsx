import PushToTalk from "@/components/PushToTalk";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            AI Voice Assistant
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Hold the button to speak, release to get an AI response
          </p>
        </div>

        <div className="max-w-xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <PushToTalk />
        </div>
      </main>
    </div>
  );
}
