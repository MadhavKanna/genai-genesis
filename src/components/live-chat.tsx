"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Avatar, AvatarFallback } from "@/src/components/ui/avatar";
import { VoiceInput } from "@/src/components/voice-input";
import {
  LucidePaperclip,
  LucideSend,
  LucideVideo,
  LucidePhone,
} from "lucide-react";

// Mock data - in a real app, this would come from Firebase
const mockMessages = [
  {
    id: "1",
    sender: {
      id: "doctor1",
      name: "Dr. Thomas Smith",
      avatar: "TS",
      role: "doctor",
    },
    content:
      "Hello! I've reviewed your case. Could you tell me more about when the symptoms first appeared?",
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
  },
  {
    id: "2",
    sender: {
      id: "patient1",
      name: "Jane Patient",
      avatar: "JP",
      role: "patient",
    },
    content:
      "Thank you for reviewing my case. The rash started about two weeks ago on my arms and then spread to my torso. It gets really itchy at night.",
    timestamp: new Date(Date.now() - 1000 * 60 * 25).toISOString(),
  },
  {
    id: "3",
    sender: {
      id: "doctor1",
      name: "Dr. Thomas Smith",
      avatar: "TS",
      role: "doctor",
    },
    content:
      "I see. Have you changed any soaps, detergents, or started any new medications recently?",
    timestamp: new Date(Date.now() - 1000 * 60 * 20).toISOString(),
  },
  {
    id: "4",
    sender: {
      id: "patient1",
      name: "Jane Patient",
      avatar: "JP",
      role: "patient",
    },
    content:
      "I did start using a new laundry detergent about 3 weeks ago. Could that be related?",
    timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
  },
  {
    id: "5",
    sender: {
      id: "doctor1",
      name: "Dr. Thomas Smith",
      avatar: "TS",
      role: "doctor",
    },
    content:
      "Yes, that could definitely be a factor. Contact dermatitis from laundry detergents is quite common. I'd recommend switching back to your previous detergent and washing all your clothes and bedding with it.",
    timestamp: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
  },
];

interface LiveChatProps {
  caseId: string;
  userRole: "patient" | "doctor";
  userName: string;
  userAvatar: string;
  otherPartyName: string;
  otherPartyAvatar: string;
  className?: string;
}

export function LiveChat({
  caseId,
  userRole,
  userName,
  userAvatar,
  otherPartyName,
  otherPartyAvatar,
  className = "",
}: LiveChatProps) {
  const [messages, setMessages] = useState(mockMessages);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Simulate the other party typing
  useEffect(() => {
    const typingInterval = setInterval(() => {
      setIsTyping(Math.random() > 0.7);
    }, 3000);

    return () => clearInterval(typingInterval);
  }, []);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const newMsg = {
      id: Date.now().toString(),
      sender: {
        id: userRole === "patient" ? "patient1" : "doctor1",
        name: userName,
        avatar: userAvatar,
        role: userRole,
      },
      content: newMessage,
      timestamp: new Date().toISOString(),
    };

    setMessages([...messages, newMsg]);
    setNewMessage("");

    // Simulate response in 2-5 seconds
    if (messages.length < 10) {
      setTimeout(() => {
        const responseMsg = {
          id: (Date.now() + 1).toString(),
          sender: {
            id: userRole === "patient" ? "doctor1" : "patient1",
            name: otherPartyName,
            avatar: otherPartyAvatar,
            role: userRole === "patient" ? "doctor" : "patient",
          },
          content:
            userRole === "patient"
              ? "Thank you for that information. Have you noticed any other changes in your routine or environment recently?"
              : "I've been applying the cream you recommended and it seems to be helping with the itching.",
          timestamp: new Date().toISOString(),
        };
        setMessages((prev) => [...prev, responseMsg]);
      }, 2000 + Math.random() * 3000);
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <Card className={`flex flex-col h-full ${className}`}>
      <CardHeader className="border-b px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarFallback>{otherPartyAvatar}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-base">{otherPartyName}</CardTitle>
              <div className="flex items-center gap-2">
                <div
                  className={`h-2 w-2 rounded-full ${
                    isOnline ? "bg-secondary" : "bg-muted"
                  }`}
                ></div>
                <span className="text-xs text-muted-foreground">
                  {isOnline ? "Online" : "Offline"}
                </span>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <LucidePhone className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <LucideVideo className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1 overflow-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender.role === userRole ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`flex gap-2 max-w-[80%] ${
                message.sender.role === userRole ? "flex-row-reverse" : ""
              }`}
            >
              <Avatar className="h-8 w-8 flex-shrink-0">
                <AvatarFallback>{message.sender.avatar}</AvatarFallback>
              </Avatar>
              <div>
                <div
                  className={`rounded-lg p-3 ${
                    message.sender.role === userRole
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  {message.content}
                </div>
                <div
                  className={`text-xs text-muted-foreground mt-1 ${
                    message.sender.role === userRole ? "text-right" : ""
                  }`}
                >
                  {formatTime(message.timestamp)}
                </div>
              </div>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="flex gap-2 max-w-[80%]">
              <Avatar className="h-8 w-8 flex-shrink-0">
                <AvatarFallback>{otherPartyAvatar}</AvatarFallback>
              </Avatar>
              <div className="rounded-lg bg-muted p-3">
                <div className="gemini-dot-pulse"></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </CardContent>
      <CardFooter className="border-t p-4">
        <div className="flex w-full gap-2">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full flex-shrink-0"
          >
            <LucidePaperclip className="h-4 w-4" />
          </Button>
          <VoiceInput
            value={newMessage}
            onChange={setNewMessage}
            onSubmit={handleSendMessage}
            placeholder="Type or speak your message..."
            rows={1}
            className="flex-1"
          />
          <Button
            className="rounded-full flex-shrink-0"
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
          >
            <LucideSend className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
