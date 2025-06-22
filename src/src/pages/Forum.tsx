
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CreatePostModal from '@/components/CreatePostModal';
import BottomNavigation from '@/components/BottomNavigation';
import { Search, ArrowUp, ArrowDown, MessageSquare, Clock, Filter, Plus } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Forum = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const { sessionState, voteOnPost } = useAuth();
  const navigate = useNavigate();

  const categories = [
    { id: 'all', name: 'Todos', count: 0 },
    { id: 'gm-tips', name: 'Dicas para Mestres', count: 8 },
    { id: 'systems', name: 'Sistemas de RPG', count: 12 },
    { id: 'adventures', name: 'Aventuras', count: 6 },
    { id: 'characters', name: 'Personagens', count: 15 }
  ];

  const getCategoryColor = (category: string) => {
    const colors = {
      'gm-tips': 'bg-red-100 text-red-800 border-red-200',
      'systems': 'bg-blue-100 text-blue-800 border-blue-200',
      'adventures': 'bg-green-100 text-green-800 border-green-200',
      'characters': 'bg-purple-100 text-purple-800 border-purple-200'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const filteredPosts = sessionState.forumPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleVote = (postId: number, voteType: 'like' | 'dislike', e: React.MouseEvent) => {
    e.stopPropagation();
    voteOnPost(postId, voteType);
  };

  const handlePostClick = (postId: number) => {
    navigate(`/forum/${postId}`);
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
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold">Fórum da Comunidade</h1>
              <Button 
                onClick={() => setIsCreateModalOpen(true)}
                className="bg-white/20 hover:bg-white/30 text-white border-white/30"
              >
                <Plus className="h-4 w-4 mr-2" />
                Novo Post
              </Button>
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 h-4 w-4" />
              <Input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar posts ou autores..."
                className="pl-10 bg-white/10 border-white/30 text-white placeholder-white/60"
              />
            </div>
          </div>

          <div className="p-6">
            {/* Categories */}
            <div className="mb-6">
              <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
                <TabsList className="w-full justify-start flex-wrap h-auto gap-2 bg-transparent">
                  {categories.map((category) => (
                    <TabsTrigger 
                      key={category.id} 
                      value={category.id}
                      className="data-[state=active]:bg-primary data-[state=active]:text-white"
                    >
                      {category.name}
                      {category.count > 0 && (
                        <Badge variant="secondary" className="ml-2 text-xs">
                          {category.count}
                        </Badge>
                      )}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>

            {/* Posts List */}
            <div className="space-y-4">
              {filteredPosts.map((post) => (
                <Card 
                  key={post.id} 
                  className="p-6 hover:shadow-lg transition-all duration-200 cursor-pointer border-primary/20 animate-fade-in"
                  onClick={() => handlePostClick(post.id)}
                >
                  <div className="flex items-start space-x-4">
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
                        <Badge className={`${getCategoryColor(post.category)} text-xs`}>
                          {post.categoryLabel}
                        </Badge>
                      </div>
                      <h3 className="text-lg font-semibold text-secondary mb-3 leading-tight">
                        {post.title}
                      </h3>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-2">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={(e) => handleVote(post.id, 'like', e)}
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
                              onClick={(e) => handleVote(post.id, 'dislike', e)}
                              className={`text-red-600 hover:bg-red-50 transition-colors ${
                                post.userVote === 'dislike' ? 'bg-red-50 font-semibold' : ''
                              }`}
                            >
                              <ArrowDown className="h-4 w-4 mr-1" />
                              {post.dislikes}
                            </Button>
                          </div>
                          <div className="flex items-center space-x-1 text-secondary/60">
                            <MessageSquare className="h-4 w-4" />
                            <span className="text-sm">{post.replies}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {filteredPosts.length === 0 && (
              <div className="text-center py-12">
                <MessageSquare className="h-12 w-12 text-secondary/30 mx-auto mb-4" />
                <p className="text-secondary/60">
                  {searchTerm ? 'Nenhum post encontrado para sua busca.' : 'Nenhum post encontrado nesta categoria.'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden">
        <BottomNavigation />
      </div>

      <CreatePostModal 
        open={isCreateModalOpen}
        onOpenChange={setIsCreateModalOpen}
      />
    </div>
  );
};

export default Forum;
