"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";

interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  senderType: "user" | "admin";
  content: string;
  createdAt: string;
}

interface Conversation {
  id: string;
  userId: string;
  status: "open" | "closed";
  createdAt: string;
  updatedAt: string;
  lastMessageAt: string | null;
  userName?: string;
  userEmail?: string;
}

interface WSMessage {
  type: "message" | "typing" | "history" | "joined" | "left";
  content?: string;
  senderId?: string;
  senderType?: "user" | "admin";
  isTyping?: boolean;
  messages?: Message[];
  timestamp?: string;
  messageId?: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://handypay-backend.handypay.workers.dev";

export default function AdminChatDashboard() {
  const [adminId, setAdminId] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [typingUser, setTypingUser] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const wsRef = useRef<WebSocket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Load conversations
  const loadConversations = useCallback(async () => {
    if (!adminId) return;
    
    try {
      const response = await fetch(`${API_BASE_URL}/api/chat/conversations`, {
        headers: {
          "Content-Type": "application/json",
          "X-User-ID": adminId,
          "X-User-Provider": "email",
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        setConversations(data.conversations || []);
      }
    } catch (error) {
      console.error("Error loading conversations:", error);
    }
  }, [adminId]);

  // Connect to WebSocket
  const connectToChat = useCallback(async (conversationId: string) => {
    if (wsRef.current) {
      wsRef.current.close();
    }

    const wsUrl = API_BASE_URL.replace("https://", "wss://").replace("http://", "ws://");
    const url = `${wsUrl}/api/chat/ws/${conversationId}?participantId=${adminId}&participantType=admin`;
    
    console.log("Connecting to WebSocket:", url);
    
    const ws = new WebSocket(url);
    wsRef.current = ws;

    ws.onopen = () => {
      console.log("WebSocket connected");
      setIsConnected(true);
    };

    ws.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data) as WSMessage;
        
        switch (message.type) {
          case "history":
            if (message.messages) {
              setMessages(message.messages);
            }
            break;
          case "message":
            if (message.messageId && message.content && message.senderId && message.senderType) {
              const newMessage: Message = {
                id: message.messageId,
                conversationId,
                senderId: message.senderId,
                senderType: message.senderType,
                content: message.content,
                createdAt: message.timestamp || new Date().toISOString(),
              };
              setMessages((prev) => [...prev, newMessage]);
            }
            break;
          case "typing":
            if (message.senderId !== adminId) {
              if (message.isTyping) {
                setIsTyping(true);
                setTypingUser("User");
              } else {
                setIsTyping(false);
                setTypingUser(null);
              }
            }
            break;
        }
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    };

    ws.onclose = () => {
      console.log("WebSocket disconnected");
      setIsConnected(false);
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };
  }, [adminId]);

  // Send message
  const sendMessage = useCallback(() => {
    if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN || !inputText.trim()) {
      return;
    }

    wsRef.current.send(JSON.stringify({
      type: "message",
      content: inputText.trim(),
    }));

    setInputText("");
  }, [inputText]);

  // Send typing indicator
  const sendTypingIndicator = useCallback((typing: boolean) => {
    if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
      return;
    }

    wsRef.current.send(JSON.stringify({
      type: "typing",
      isTyping: typing,
    }));
  }, []);

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
    
    // Send typing indicator
    sendTypingIndicator(e.target.value.length > 0);
    
    // Clear typing after 3 seconds
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    typingTimeoutRef.current = setTimeout(() => {
      sendTypingIndicator(false);
    }, 3000);
  };

  // Handle key press
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Select conversation
  const handleSelectConversation = (conversation: Conversation) => {
    setSelectedConversation(conversation);
    setMessages([]);
    connectToChat(conversation.id);
  };

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Load conversations on auth
  useEffect(() => {
    if (isAuthenticated) {
      loadConversations();
      // Refresh every 30 seconds
      const interval = setInterval(loadConversations, 30000);
      return () => clearInterval(interval);
    }
  }, [isAuthenticated, loadConversations]);

  // Authentication screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
        <div className="bg-gray-800 rounded-2xl p-8 max-w-md w-full">
          <h1 className="text-2xl font-bold text-white mb-6 text-center">
            Admin Chat Dashboard
          </h1>
          <p className="text-gray-400 mb-6 text-center">
            Enter your admin user ID to access the chat dashboard.
          </p>
          <input
            type="text"
            placeholder="Enter Admin User ID"
            value={adminId}
            onChange={(e) => setAdminId(e.target.value)}
            className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-green-500 focus:outline-none mb-4"
          />
          <button
            onClick={() => {
              if (adminId.trim()) {
                setIsAuthenticated(true);
              }
            }}
            disabled={!adminId.trim()}
            className="w-full py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Access Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 flex">
      {/* Sidebar - Conversations List */}
      <div className="w-80 bg-gray-800 border-r border-gray-700 flex flex-col">
        <div className="p-4 border-b border-gray-700">
          <h1 className="text-xl font-bold text-white">Support Chats</h1>
          <p className="text-sm text-gray-400 mt-1">
            {conversations.length} open conversation{conversations.length !== 1 ? "s" : ""}
          </p>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {conversations.length === 0 ? (
            <div className="p-4 text-center text-gray-500">
              No conversations yet
            </div>
          ) : (
            conversations.map((conversation) => (
              <button
                key={conversation.id}
                onClick={() => handleSelectConversation(conversation)}
                className={`w-full p-4 text-left border-b border-gray-700 hover:bg-gray-700 transition-colors ${
                  selectedConversation?.id === conversation.id ? "bg-gray-700" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-semibold">
                    {(conversation.userName?.[0] || conversation.userEmail?.[0] || "U").toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-white truncate">
                      {conversation.userName || conversation.userEmail || "Unknown User"}
                    </div>
                    <div className="text-sm text-gray-400 truncate">
                      {conversation.userEmail || "No email"}
                    </div>
                  </div>
                </div>
              </button>
            ))
          )}
        </div>
        
        <div className="p-4 border-t border-gray-700">
          <button
            onClick={loadConversations}
            className="w-full py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            Refresh
          </button>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedConversation ? (
          <>
            {/* Chat Header */}
            <div className="p-4 bg-gray-800 border-b border-gray-700 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-white">
                  {selectedConversation.userName || selectedConversation.userEmail || "Unknown User"}
                </h2>
                <div className="flex items-center gap-2 text-sm">
                  <span className={`w-2 h-2 rounded-full ${isConnected ? "bg-green-500" : "bg-red-500"}`} />
                  <span className="text-gray-400">
                    {isConnected ? "Connected" : "Disconnected"}
                  </span>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => {
                const isOwnMessage = message.senderId === adminId;
                return (
                  <div
                    key={message.id}
                    className={`flex ${isOwnMessage ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[70%] rounded-2xl px-4 py-3 ${
                        isOwnMessage
                          ? "bg-green-600 text-white"
                          : "bg-gray-700 text-white"
                      }`}
                    >
                      <p className="whitespace-pre-wrap">{message.content}</p>
                      <p className={`text-xs mt-1 ${isOwnMessage ? "text-green-200" : "text-gray-400"}`}>
                        {new Date(message.createdAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                );
              })}
              
              {/* Typing indicator */}
              {isTyping && typingUser && (
                <div className="flex justify-start">
                  <div className="bg-gray-700 text-gray-300 rounded-2xl px-4 py-3 italic">
                    {typingUser} is typing...
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 bg-gray-800 border-t border-gray-700">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={inputText}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                  placeholder="Type a message..."
                  disabled={!isConnected}
                  className="flex-1 px-4 py-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-green-500 focus:outline-none disabled:opacity-50"
                />
                <button
                  onClick={sendMessage}
                  disabled={!isConnected || !inputText.trim()}
                  className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Send
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            <div className="text-center">
              <svg className="w-16 h-16 mx-auto mb-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <p className="text-lg">Select a conversation to start chatting</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


