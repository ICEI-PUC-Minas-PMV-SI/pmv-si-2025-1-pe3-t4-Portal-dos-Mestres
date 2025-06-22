
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Send, Users } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: number;
  sender: string;
  content: string;
  timestamp: string;
  avatar: string;
}

interface Member {
  id: number;
  name: string;
  role: string;
  avatar: string;
  online: boolean;
}

interface GroupChatPanelProps {
  groupId: string;
  messages: Message[];
  members: Member[];
  onSendMessage: (message: string) => void;
  className?: string;
}

const GroupChatPanel: React.FC<GroupChatPanelProps> = ({
  groupId,
  messages,
  members,
  onSendMessage,
  className = ""
}) => {
  const [message, setMessage] = useState('');
  const [typingUsers, setTypingUsers] = useState<string[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Simulate typing indicator
  useEffect(() => {
    let typingTimer: NodeJS.Timeout;
    
    if (isTyping) {
      // Simulate other users seeing typing
      const timer = setTimeout(() => {
        setTypingUsers(['ThorMartelo']);
      }, 1000);
      
      typingTimer = setTimeout(() => {
        setTypingUsers([]);
      }, 3000);
      
      return () => {
        clearTimeout(timer);
        clearTimeout(typingTimer);
      };
    }
  }, [isTyping]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message.trim());
      setMessage('');
      setIsTyping(false);
      
      toast({
        title: "Mensagem enviada!",
        description: "Sua mensagem foi enviada para o grupo.",
      });
    }
  };

  const handleTyping = (value: string) => {
    setMessage(value);
    if (value.length > 0 && !isTyping) {
      setIsTyping(true);
    } else if (value.length === 0 && isTyping) {
      setIsTyping(false);
    }
  };

  return (
    <div className={`flex flex-col h-full ${className}`}>
      {/* Desktop Members Sidebar */}
      <div className="hidden lg:flex lg:w-64 lg:border-r lg:border-primary/20 lg:flex-col">
        <div className="p-4 border-b border-primary/20">
          <div className="flex items-center space-x-2">
            <Users className="h-5 w-5 text-primary" />
            <h3 className="font-semibold text-secondary">Membros ({members.length})</h3>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {members.map((member) => (
            <div key={member.id} className="flex items-center space-x-3">
              <div className="relative">
                <img 
                  src={member.avatar}
                  alt={member.name}
                  className="w-8 h-8 rounded-full"
                />
                {member.online && (
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-secondary truncate">{member.name}</p>
                <p className="text-xs text-secondary/60">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className="flex space-x-3 animate-fade-in">
              <img 
                src={msg.avatar}
                alt={msg.sender}
                className="w-8 h-8 rounded-full flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="font-medium text-sm text-secondary truncate">{msg.sender}</span>
                  <span className="text-xs text-secondary/50 flex-shrink-0">{msg.timestamp}</span>
                </div>
                <div className="bg-gray-50 rounded-lg p-3 text-sm break-words hover:bg-gray-100 transition-colors">
                  {msg.content}
                </div>
              </div>
            </div>
          ))}
          
          {/* Typing indicator */}
          {typingUsers.length > 0 && (
            <div className="flex space-x-3 animate-fade-in">
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                <div className="flex space-x-1">
                  <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="bg-gray-100 rounded-lg p-3 text-sm text-secondary/60">
                  {typingUsers.join(', ')} está digitando...
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <div className="border-t border-primary/20 p-4">
          <form onSubmit={handleSendMessage} className="flex space-x-2">
            <Input
              value={message}
              onChange={(e) => handleTyping(e.target.value)}
              placeholder="Digite sua mensagem..."
              className="flex-1"
              maxLength={500}
            />
            <Button 
              type="submit" 
              size="icon" 
              className="bg-primary hover:bg-primary-dark"
              disabled={!message.trim()}
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default GroupChatPanel;
