
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useAuth } from '@/contexts/AuthContext';
import BottomNavigation from '@/components/BottomNavigation';
import { Edit, Users, MessageSquare, Calendar, LogOut, Settings } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user, updateProfile, logout } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    username: user?.username || '',
    bio: user?.bio || ''
  });

  const handleSaveProfile = () => {
    updateProfile(editForm);
    setIsEditing(false);
    toast({
      title: "Perfil atualizado!",
      description: "Suas informações foram salvas com sucesso.",
    });
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    toast({
      title: "Desconectado",
      description: "Você foi desconectado com sucesso.",
    });
  };

  const myGroups = [
    {
      id: 1,
      name: 'Os Guardiões de Asgard',
      system: 'D&D 5e',
      role: 'Jogador',
      image: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=200&h=200&fit=crop'
    },
    {
      id: 2,
      name: 'Irmandade da Chama',
      system: 'Pathfinder',
      role: 'GM',
      image: 'https://images.unsplash.com/photo-1493962853295-0fd70327578a?w=200&h=200&fit=crop'
    }
  ];

  const achievements = [
    { name: 'Primeiro Personagem', description: 'Criou seu primeiro personagem', earned: true },
    { name: 'Mestre Iniciante', description: 'Narrou sua primeira sessão', earned: true },
    { name: 'Veterano', description: 'Participou de 10 sessões', earned: false },
    { name: 'Construtor de Mundos', description: 'Criou 5 grupos diferentes', earned: false }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-lighter/10 to-white">
      <div className="md:flex md:max-w-7xl md:mx-auto">
        {/* Desktop Sidebar */}
        <div className="hidden md:block md:w-64 md:border-r md:border-primary/20">
          <BottomNavigation />
        </div>

        {/* Main Content */}
        <div className="flex-1 pb-20 md:pb-0">
          {/* Profile Header */}
          <div className="rpg-gradient text-white p-6 rounded-b-3xl md:rounded-none">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold">Meu Perfil</h1>
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                <Settings className="h-5 w-5" />
              </Button>
            </div>

            <div className="flex items-center space-x-4 mb-6">
              <img 
                src={user?.avatar}
                alt={user?.username}
                className="w-20 h-20 rounded-full border-3 border-white/30 flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <h2 className="text-xl font-bold truncate">{user?.username}</h2>
                <p className="text-white/80 text-sm mb-2 break-words">{user?.bio}</p>
                <Dialog open={isEditing} onOpenChange={setIsEditing}>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="sm" className="text-white hover:bg-white/10 p-0">
                      <Edit className="h-4 w-4 mr-2" />
                      Editar Perfil
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="mx-4 max-w-md">
                    <DialogHeader>
                      <DialogTitle>Editar Perfil</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="username">Nome de Usuário</Label>
                        <Input
                          id="username"
                          value={editForm.username}
                          onChange={(e) => setEditForm(prev => ({ ...prev, username: e.target.value }))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea
                          id="bio"
                          value={editForm.bio}
                          onChange={(e) => setEditForm(prev => ({ ...prev, bio: e.target.value }))}
                          rows={3}
                        />
                      </div>
                      <div className="flex justify-end space-x-2">
                        <Button variant="outline" onClick={() => setIsEditing(false)}>
                          Cancelar
                        </Button>
                        <Button onClick={handleSaveProfile} className="bg-primary hover:bg-primary-dark">
                          Salvar
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            {/* Stats */}
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

          <div className="p-6 space-y-6 max-w-4xl mx-auto">
            {/* My Groups */}
            <div>
              <h3 className="text-lg font-semibold text-secondary mb-4">Meus Grupos</h3>
              <div className="grid gap-3 md:grid-cols-2">
                {myGroups.map((group) => (
                  <Card key={group.id} className="p-4 hover:shadow-lg transition-shadow border-primary/20">
                    <div className="flex items-center space-x-4">
                      <img 
                        src={group.image}
                        alt={group.name}
                        className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-secondary truncate">{group.name}</h4>
                        <div className="flex items-center space-x-2 mt-1 flex-wrap">
                          <Badge variant="secondary" className="text-xs">{group.system}</Badge>
                          <Badge 
                            variant={group.role === 'GM' ? 'default' : 'outline'} 
                            className="text-xs"
                          >
                            {group.role}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div>
              <h3 className="text-lg font-semibold text-secondary mb-4">Conquistas</h3>
              <div className="grid gap-3 md:grid-cols-2">
                {achievements.map((achievement, index) => (
                  <Card 
                    key={index} 
                    className={`p-4 transition-all ${achievement.earned ? 'border-primary bg-primary/5' : 'border-gray-200 bg-gray-50'}`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                        achievement.earned ? 'bg-primary text-white' : 'bg-gray-300 text-gray-500'
                      }`}>
                        {achievement.earned ? '🏆' : '🔒'}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className={`font-medium ${achievement.earned ? 'text-secondary' : 'text-gray-500'}`}>
                          {achievement.name}
                        </h4>
                        <p className={`text-sm ${achievement.earned ? 'text-secondary/70' : 'text-gray-400'}`}>
                          {achievement.description}
                        </p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Account Actions */}
            <div className="pt-4 border-t border-gray-200">
              <Button 
                onClick={handleLogout}
                variant="outline" 
                className="w-full text-red-600 border-red-200 hover:bg-red-50"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sair da Conta
              </Button>
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

export default Profile;
