
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import ResponsiveLayout from '@/components/layout/ResponsiveLayout';
import BottomNavigation from '@/components/BottomNavigation';
import { Plus, Users, MessageSquare, Calendar, Search, TrendingUp, Clock, User } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const Dashboard = () => {
  const { user } = useAuth();
  const isMobile = useIsMobile();

  const recentGroups = [
    {
      id: 1,
      name: 'Os Guardiões de Asgard',
      system: 'D&D 5e',
      image: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=200&h=200&fit=crop',
      members: 6,
      lastActivity: '2 horas atrás'
    },
    {
      id: 2, 
      name: 'Irmandade da Chama',
      system: 'Pathfinder',
      image: 'https://images.unsplash.com/photo-1493962853295-0fd70327578a?w=200&h=200&fit=crop',
      members: 4,
      lastActivity: '1 dia atrás'
    }
  ];

  const recentForumPosts = [
    {
      id: 1,
      title: 'Como criar NPCs memoráveis',
      author: 'MestreAntigo',
      replies: 23,
      timeAgo: '3 horas'
    },
    {
      id: 2,
      title: 'Regras caseiras para combate épico',
      author: 'GuerreiroSábio',
      replies: 15,
      timeAgo: '6 horas'
    }
  ];

  const quickActions = [
    {
      title: 'Encontrar Grupos',
      description: 'Junte-se a uma aventura',
      icon: () => <Users />,
      link: '/groups',
      color: 'bg-blue-500'
    },
    {
      title: 'Fórum',
      description: 'Compartilhe ideias',
      icon: () => <MessageSquare />,
      link: '/forum',
      color: 'bg-green-500'
    },
    {
      title: 'Criar Grupo',
      description: 'Inicie sua campanha',
      icon: () => <Plus />,
      link: '/groups',
      color: 'bg-purple-500'
    },
    {
      title: 'Meu Perfil',
      description: 'Gerencie sua conta',
      icon: () => <User />,
      link: '/profile',
      color: 'bg-orange-500'
    }
  ];

  if (isMobile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-lighter/10 to-white pb-20">
        {/* Mobile Header */}
        <div className="rpg-gradient text-white p-6 rounded-b-3xl">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <img 
                src={user?.avatar} 
                alt={user?.username}
                className="w-12 h-12 rounded-full border-2 border-white/30"
              />
              <div>
                <h1 className="text-xl font-bold">Olá, {user?.username}!</h1>
                <p className="text-white/80 text-sm">Pronto para a aventura?</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
              <Search className="h-5 w-5" />
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold">{user?.groupsJoined}</div>
              <div className="text-white/80 text-sm">Grupos</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{user?.forumPosts}</div>
              <div className="text-white/80 text-sm">Posts</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{user?.followersCount}</div>
              <div className="text-white/80 text-sm">Seguidores</div>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-4">
            <Link to="/groups">
              <Card className="p-4 text-center hover:shadow-lg transition-shadow border-primary/20">
                <Users className="h-8 w-8 text-primary mx-auto mb-2" />
                <h3 className="font-semibold text-secondary">Encontrar Grupos</h3>
                <p className="text-sm text-secondary/60">Junte-se a uma aventura</p>
              </Card>
            </Link>
            <Link to="/forum">
              <Card className="p-4 text-center hover:shadow-lg transition-shadow border-primary/20">
                <MessageSquare className="h-8 w-8 text-primary mx-auto mb-2" />
                <h3 className="font-semibold text-secondary">Fórum</h3>
                <p className="text-sm text-secondary/60">Compartilhe ideias</p>
              </Card>
            </Link>
          </div>

          {/* Recent Groups */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-secondary">Meus Grupos</h2>
              <Link to="/groups">
                <Button variant="ghost" size="sm" className="text-primary">
                  Ver todos
                </Button>
              </Link>
            </div>
            
            <div className="space-y-3">
              {recentGroups.map((group) => (
                <Link key={group.id} to={`/groups/${group.id}`}>
                  <Card className="p-4 hover:shadow-lg transition-shadow border-primary/20">
                    <div className="flex items-center space-x-4">
                      <img 
                        src={group.image}
                        alt={group.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-secondary">{group.name}</h3>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant="secondary" className="text-xs">{group.system}</Badge>
                          <span className="text-sm text-secondary/60">{group.members} membros</span>
                        </div>
                        <p className="text-xs text-secondary/50 mt-1">{group.lastActivity}</p>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>

          {/* Recent Forum Posts */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-secondary">Fórum em Destaque</h2>
              <Link to="/forum">
                <Button variant="ghost" size="sm" className="text-primary">
                  Ver mais
                </Button>
              </Link>
            </div>
            
            <div className="space-y-3">
              {recentForumPosts.map((post) => (
                <Link key={post.id} to={`/forum/${post.id}`}>
                  <Card className="p-4 hover:shadow-lg transition-shadow border-primary/20">
                    <h3 className="font-medium text-secondary mb-2">{post.title}</h3>
                    <div className="flex items-center justify-between text-sm text-secondary/60">
                      <span>por {post.author}</span>
                      <div className="flex items-center space-x-4">
                        <span>{post.replies} respostas</span>
                        <span>{post.timeAgo}</span>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <BottomNavigation />
      </div>
    );
  }

  // Desktop Layout
  return (
    <ResponsiveLayout sidebar={<BottomNavigation />}>
      <div className="min-h-screen">
        {/* Desktop Header */}
        <div className="bg-white border-b border-primary/20 p-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <img 
                  src={user?.avatar} 
                  alt={user?.username}
                  className="w-16 h-16 rounded-full border-2 border-primary/20"
                />
                <div>
                  <h1 className="text-3xl font-bold text-secondary">Olá, {user?.username}!</h1>
                  <p className="text-secondary/70">Bem-vindo de volta. Pronto para a aventura?</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary/40 h-4 w-4" />
                  <Input
                    placeholder="Buscar grupos, usuários..."
                    className="pl-10 w-64"
                  />
                </div>
                <Button className="bg-primary hover:bg-primary-dark">
                  <Plus className="h-4 w-4 mr-2" />
                  Criar Grupo
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-4 gap-6 mb-8">
            <Card className="p-6 text-center border-primary/20">
              <div className="flex items-center justify-center mb-2">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <div className="text-3xl font-bold text-secondary">{user?.groupsJoined}</div>
              <div className="text-secondary/60">Grupos Ativos</div>
            </Card>
            <Card className="p-6 text-center border-primary/20">
              <div className="flex items-center justify-center mb-2">
                <MessageSquare className="h-8 w-8 text-green-500" />
              </div>
              <div className="text-3xl font-bold text-secondary">{user?.forumPosts}</div>
              <div className="text-secondary/60">Posts no Fórum</div>
            </Card>
            <Card className="p-6 text-center border-primary/20">
              <div className="flex items-center justify-center mb-2">
                <TrendingUp className="h-8 w-8 text-blue-500" />
              </div>
              <div className="text-3xl font-bold text-secondary">{user?.followersCount}</div>
              <div className="text-secondary/60">Seguidores</div>
            </Card>
            <Card className="p-6 text-center border-primary/20">
              <div className="flex items-center justify-center mb-2">
                <Calendar className="h-8 w-8 text-purple-500" />
              </div>
              <div className="text-3xl font-bold text-secondary">3</div>
              <div className="text-secondary/60">Sessões esta Semana</div>
            </Card>
          </div>

          {/* Quick Actions Grid */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-secondary mb-6">Ações Rápidas</h2>
            <div className="grid grid-cols-4 gap-4">
              {quickActions.map((action, index) => (
                <Link key={index} to={action.link}>
                  <Card className="p-6 text-center hover:shadow-lg transition-all hover:scale-105 border-primary/20 group">
                    <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                      <span className="text-white">{action.icon()}</span>
                    </div>
                    <h3 className="font-semibold text-secondary mb-2">{action.title}</h3>
                    <p className="text-sm text-secondary/60">{action.description}</p>
                  </Card>
                </Link>
              ))}
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-3 gap-8">
            {/* Recent Groups */}
            <div className="col-span-2">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-secondary">Meus Grupos</h2>
                <Link to="/groups">
                  <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
                    Ver Todos os Grupos
                  </Button>
                </Link>
              </div>
              
              <div className="grid gap-4">
                {recentGroups.map((group) => (
                  <Link key={group.id} to={`/groups/${group.id}`}>
                    <Card className="p-6 hover:shadow-lg transition-all hover:scale-105 border-primary/20">
                      <div className="flex items-center space-x-6">
                        <img 
                          src={group.image}
                          alt={group.name}
                          className="w-20 h-20 rounded-xl object-cover"
                        />
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-secondary mb-2">{group.name}</h3>
                          <div className="flex items-center space-x-4 mb-2">
                            <Badge variant="secondary">{group.system}</Badge>
                            <div className="flex items-center space-x-1 text-secondary/60">
                              <Users className="h-4 w-4" />
                              <span>{group.members} membros</span>
                            </div>
                            <div className="flex items-center space-x-1 text-secondary/60">
                              <Clock className="h-4 w-4" />
                              <span>{group.lastActivity}</span>
                            </div>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          Entrar no Chat
                        </Button>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>

            {/* Sidebar Content */}
            <div className="space-y-6">
              {/* Recent Forum Activity */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-secondary">Fórum em Destaque</h3>
                  <Link to="/forum">
                    <Button variant="ghost" size="sm" className="text-primary">
                      Ver mais
                    </Button>
                  </Link>
                </div>
                
                <div className="space-y-3">
                  {recentForumPosts.map((post) => (
                    <Link key={post.id} to={`/forum/${post.id}`}>
                      <Card className="p-4 hover:shadow-md transition-shadow border-primary/20">
                        <h4 className="font-medium text-secondary mb-2 line-clamp-2">{post.title}</h4>
                        <div className="text-sm text-secondary/60">
                          <div className="flex items-center justify-between">
                            <span>por {post.author}</span>
                            <span>{post.timeAgo}</span>
                          </div>
                          <div className="mt-1">
                            {post.replies} respostas
                          </div>
                        </div>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Quick Tips */}
              <Card className="p-4 bg-primary/5 border-primary/20">
                <h4 className="font-semibold text-secondary mb-2">💡 Dica do Dia</h4>
                <p className="text-sm text-secondary/70">
                  Use descrições detalhadas ao criar seus personagens. Isso ajuda outros jogadores a se conectarem melhor com sua história!
                </p>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </ResponsiveLayout>
  );
};

export default Dashboard;
