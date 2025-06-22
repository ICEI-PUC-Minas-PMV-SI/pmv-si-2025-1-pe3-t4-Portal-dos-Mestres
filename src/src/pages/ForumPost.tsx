
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import BottomNavigation from '@/components/BottomNavigation';
import { ArrowLeft, ArrowUp, ArrowDown, MessageSquare, Clock, Share } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

const ForumPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, sessionState, voteOnPost } = useAuth();
  const [replyContent, setReplyContent] = useState('');

  // Find the post from session state or use mock data
  const post = sessionState.forumPosts.find(p => p.id === Number(id)) || {
    id: 1,
    title: 'Como criar NPCs memoráveis que seus jogadores vão amar (ou odiar)',
    author: 'MestreAntigo',
    avatar: 'https://images.unsplash.com/photo-1501286353178-1ec881214838?w=100&h=100&fit=crop',
    category: 'gm-tips',
    categoryLabel: 'Dicas para Mestres',
    timeAgo: '3 horas',
    likes: 31,
    dislikes: 2,
    replies: 12,
    userVote: null,
    content: `# Como criar NPCs memoráveis

Depois de 15 anos narrando, aprendi algumas técnicas que fazem toda a diferença na criação de NPCs que marcam. Aqui estão minhas dicas:

## 1. Dê a eles uma motivação clara
Todo NPC precisa querer alguma coisa. Pode ser poder, amor, vingança, ou simplesmente sobreviver. Essa motivação deve ser clara para você, mesmo que não seja para os jogadores.

## 2. Uma característica marcante
Pode ser um tique nervoso, uma forma de falar peculiar, ou uma obsessão estranha. Algo que os jogadores lembrem.

## 3. Conecte com a história dos PCs
Os NPCs mais memoráveis são aqueles que se conectam com o passado, presente ou futuro dos personagens dos jogadores.

**Exemplo prático:** Criei um NPC taverno que sempre limpava os copos enquanto falava. Os jogadores sempre lembram do "barman dos copos". Simples, mas efetivo!

O que vocês acham? Compartilhem suas técnicas!`
  };

  const replies = [
    {
      id: 1,
      author: 'GuerreiroSábio',
      avatar: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=100&h=100&fit=crop',
      content: 'Excelente post! Eu sempre dou vozes diferentes para meus NPCs. Mesmo que seja só uma mudança de tom, ajuda muito os jogadores a diferenciarem.',
      timeAgo: '2 horas',
      likes: 12,
      dislikes: 0
    },
    {
      id: 2,
      author: 'NarradorLendário',
      avatar: 'https://images.unsplash.com/photo-1493962853295-0fd70327578a?w=100&h=100&fit=crop',
      content: 'Concordo 100%! Uma técnica que uso é criar "segredos" para cada NPC, mesmo que nunca sejam revelados. Isso dá profundidade ao interpretar.',
      timeAgo: '1 hora',
      likes: 8,
      dislikes: 1
    }
  ];

  const handleVote = (type: 'like' | 'dislike') => {
    voteOnPost(post.id, type);
    toast({
      title: type === 'like' ? "Voto positivo!" : "Voto negativo!",
      description: "Seu voto foi registrado.",
    });
  };

  const handleReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (replyContent.trim()) {
      toast({
        title: "Resposta enviada!",
        description: "Sua resposta foi adicionada à discussão.",
      });
      setReplyContent('');
    }
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'gm-tips': 'bg-red-100 text-red-800 border-red-200'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-lighter/10 to-white">
      <div className="md:flex md:max-w-7xl md:mx-auto">
        {/* Desktop Sidebar */}
        <div className="hidden md:block md:w-64 md:border-r md:border-primary/20">
          <BottomNavigation />
        </div>

        {/* Main Content */}
        <div className="flex-1 pb-20 md:pb-0">
          {/* Header */}
          <div className="rpg-gradient text-white p-6 rounded-b-3xl md:rounded-none">
            <Button
              variant="ghost"
              onClick={() => navigate('/forum')}
              className="text-white hover:bg-white/10 mb-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar ao Fórum
            </Button>
            <h1 className="text-xl font-bold leading-tight">{post.title}</h1>
          </div>

          <div className="p-6 space-y-6 max-w-4xl mx-auto">
            {/* Main Post */}
            <Card className="p-6 border-primary/20 animate-fade-in">
              {/* Post Header */}
              <div className="flex items-start space-x-3 mb-4">
                <img 
                  src={post.avatar}
                  alt={post.author}
                  className="w-12 h-12 rounded-full flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-2 flex-wrap">
                    <span className="font-semibold text-secondary">{post.author}</span>
                    <span className="text-xs text-secondary/50">•</span>
                    <span className="text-xs text-secondary/50">{post.timeAgo}</span>
                  </div>
                  <Badge className={`${getCategoryColor(post.category)} text-xs`}>
                    {post.categoryLabel}
                  </Badge>
                </div>
              </div>

              {/* Post Content */}
              <div className="prose prose-sm max-w-none mb-6">
                <div className="text-secondary space-y-4">
                  {post.content && post.content.split('\n').map((line, index) => {
                    if (line.startsWith('# ')) {
                      return <h1 key={index} className="text-xl font-bold text-secondary mt-6 mb-3">{line.substring(2)}</h1>;
                    } else if (line.startsWith('## ')) {
                      return <h2 key={index} className="text-lg font-semibold text-secondary mt-4 mb-2">{line.substring(3)}</h2>;
                    } else if (line.includes('**') && line.includes('**')) {
                      const parts = line.split('**');
                      return (
                        <p key={index} className="mb-2">
                          {parts.map((part, partIndex) => 
                            partIndex % 2 === 1 ? <strong key={partIndex}>{part}</strong> : part
                          )}
                        </p>
                      );
                    } else if (line.trim() === '') {
                      return <br key={index} />;
                    } else {
                      return <p key={index} className="mb-2">{line}</p>;
                    }
                  })}
                </div>
              </div>

              {/* Post Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleVote('like')}
                      className={`text-green-600 hover:bg-green-50 transition-colors ${
                        post.userVote === 'like' ? 'bg-green-50 font-semibold' : ''
                      }`}
                    >
                      <ArrowUp className="h-4 w-4 mr-1" />
                      {post.likes}
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleVote('dislike')}
                      className={`text-red-600 hover:bg-red-50 transition-colors ${
                        post.userVote === 'dislike' ? 'bg-red-50 font-semibold' : ''
                      }`}
                    >
                      <ArrowDown className="h-4 w-4 mr-1" />
                      {post.dislikes}
                    </Button>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="text-secondary/60">
                  <Share className="h-4 w-4 mr-2" />
                  Compartilhar
                </Button>
              </div>
            </Card>

            {/* Replies */}
            <div>
              <h3 className="text-lg font-semibold text-secondary mb-4">
                Respostas ({replies.length})
              </h3>
              
              <div className="space-y-4 mb-6">
                {replies.map((reply) => (
                  <Card key={reply.id} className="p-4 border-l-4 border-l-primary/30 animate-fade-in">
                    <div className="flex items-start space-x-3">
                      <img 
                        src={reply.avatar}
                        alt={reply.author}
                        className="w-8 h-8 rounded-full flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="font-medium text-sm text-secondary">{reply.author}</span>
                          <span className="text-xs text-secondary/50">•</span>
                          <span className="text-xs text-secondary/50">{reply.timeAgo}</span>
                        </div>
                        <p className="text-secondary/80 text-sm mb-3 break-words">{reply.content}</p>
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm" className="text-green-600 hover:bg-green-50 text-xs">
                            <ArrowUp className="h-3 w-3 mr-1" />
                            {reply.likes}
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-600 hover:bg-red-50 text-xs">
                            <ArrowDown className="h-3 w-3 mr-1" />
                            {reply.dislikes}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Reply Form */}
              <Card className="p-4">
                <form onSubmit={handleReply} className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-secondary mb-2 block">
                      Sua Resposta
                    </label>
                    <Textarea
                      value={replyContent}
                      onChange={(e) => setReplyContent(e.target.value)}
                      placeholder="Compartilhe sua opinião ou experiência..."
                      rows={4}
                      className="resize-none"
                    />
                  </div>
                  <div className="flex justify-end">
                    <Button type="submit" className="bg-primary hover:bg-primary-dark">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Responder
                    </Button>
                  </div>
                </form>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden">
        <BottomNavigation />
      </div>
    </div>
  );
};

export default ForumPost;
