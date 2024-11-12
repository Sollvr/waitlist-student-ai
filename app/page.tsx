'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Calendar, BookOpen, Clock, Brain } from 'lucide-react'

export default function WaitlistPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState<{
    message: string;
    type: 'success' | 'error' | null;
  }>({ message: '', type: null });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus({ message: '', type: null });

    const formData = new FormData(e.currentTarget);
    const data = {
      fullName: formData.get('fullName'),
      email: formData.get('email'),
      fieldOfStudy: formData.get('fieldOfStudy'),
    };

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('Submission failed');

      setFormStatus({
        message: 'Successfully joined the waitlist! Check your email for confirmation.',
        type: 'success',
      });
      (e.target as HTMLFormElement).reset();
    } catch {
      setFormStatus({
        message: 'Failed to join waitlist. Please try again.',
        type: 'error',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-100 to-orange-50 text-gray-900">
      <main className="container mx-auto px-4 py-16">
        <section className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Revolutionize Your Study Habits with AI</h1>
          <p className="text-xl text-gray-700 mb-8">Join the waitlist for Student AI Helper - Your personal AI assistant for academic success</p>
          <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white">Join Waitlist</Button>
        </section>

        <section className="grid md:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Transform Your Learning Experience</h2>
            <p className="text-gray-700 mb-4">
              Student AI Helper is an innovative AI-enhanced application designed to boost your academic performance. 
              Our cutting-edge technology helps you organize your schedule, generate custom quizzes, and create 
              concise summaries of your study materials.
            </p>
            <ul className="space-y-2">
              <li className="flex items-center"><Calendar className="mr-2 h-5 w-5 text-orange-500" /> AI-powered schedule organization</li>
              <li className="flex items-center"><BookOpen className="mr-2 h-5 w-5 text-orange-500" /> Personalized quiz generation</li>
              <li className="flex items-center"><Clock className="mr-2 h-5 w-5 text-orange-500" /> Efficient study material summarization</li>
              <li className="flex items-center"><Brain className="mr-2 h-5 w-5 text-orange-500" /> Adaptive learning algorithms</li>
            </ul>
          </div>
          <div className="bg-gray-900 p-6 rounded-lg shadow-lg text-white">
            <h3 className="text-xl font-semibold mb-4">Be the First to Experience the Future of Learning</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                name="fullName"
                type="text"
                placeholder="Full Name"
                aria-label="Full Name"
                required
                className="bg-gray-800 text-white border-gray-700"
              />
              <Input
                name="email"
                type="email"
                placeholder="Email Address"
                aria-label="Email Address"
                required
                className="bg-gray-800 text-white border-gray-700"
              />
              <Input
                name="fieldOfStudy"
                type="text"
                placeholder="Field of Study"
                aria-label="Field of Study"
                className="bg-gray-800 text-white border-gray-700"
              />
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white disabled:opacity-50"
              >
                {isSubmitting ? 'Signing up...' : 'Sign Up for Early Access'}
              </Button>
              {formStatus.message && (
                <div
                  className={`mt-4 p-3 rounded ${
                    formStatus.type === 'success'
                      ? 'bg-green-600 text-white'
                      : 'bg-red-600 text-white'
                  }`}
                >
                  {formStatus.message}
                </div>
              )}
            </form>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full space-y-2">
            <AccordionItem value="item-1" className="border border-orange-300 rounded-lg overflow-hidden">
              <AccordionTrigger className="bg-orange-200 text-gray-900 px-4 hover:bg-orange-300">How does Student AI Helper organize my schedule?</AccordionTrigger>
              <AccordionContent className="bg-white text-gray-900 px-4">
                Our AI analyzes your course load, deadlines, and study habits to create an optimized schedule. 
                It adapts to your learning pace and suggests the best times for studying different subjects.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2" className="border border-orange-300 rounded-lg overflow-hidden">
              <AccordionTrigger className="bg-orange-200 text-gray-900 px-4 hover:bg-orange-300">Can I customize the quizzes generated by the AI?</AccordionTrigger>
              <AccordionContent className="bg-white text-gray-900 px-4">
                You can specify topics, difficulty levels, and question types. The AI will generate 
                quizzes tailored to your preferences and learning objectives.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3" className="border border-orange-300 rounded-lg overflow-hidden">
              <AccordionTrigger className="bg-orange-200 text-gray-900 px-4 hover:bg-orange-300">How accurate are the AI-generated summaries?</AccordionTrigger>
              <AccordionContent className="bg-white text-gray-900 px-4">
                Our AI uses advanced natural language processing to create highly accurate summaries. It extracts 
                key concepts and important details, providing concise yet comprehensive study materials.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4" className="border border-orange-300 rounded-lg overflow-hidden">
              <AccordionTrigger className="bg-orange-200 text-gray-900 px-4 hover:bg-orange-300">Is my data safe and private?</AccordionTrigger>
              <AccordionContent className="bg-white text-gray-900 px-4">
                We take data privacy seriously. All your information is encrypted and stored securely. We never 
                share your personal data or study materials with third parties.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

        <section className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Ready to Transform Your Academic Journey?</h2>
          <p className="text-gray-700 mb-6">Join thousands of students already on the waitlist for Student AI Helper</p>
          <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white">Sign Up Now</Button>
        </section>
      </main>
    </div>
  )
}