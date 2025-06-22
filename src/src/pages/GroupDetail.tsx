import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ResponsiveLayout from '@/components/layout/ResponsiveLayout';
import GroupChatPanel from '@/components/group/GroupChatPanel';
import CharacterSheet from '@/components/character/CharacterSheet';
import BottomNavigation from '@/components/BottomNavigation';
import { ArrowLeft, Users, Calendar, Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { useIsMobile } from '@/hooks/use-mobile';

const GroupDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, sessionState, addGroupMessage } = useAuth();
  const isMobile = useIsMobile();
  const [showCharacterCreation, setShowCharacterCreation] = useState(false);

  // Mock group data
  const group = {
    id: 1,
    name: 'Os Guardiões de Asgard',
    description: 'Uma campanha épica de D&D 5e onde os heróis devem proteger os nove reinos de uma ameaça antiga que ressurgiu. Focamos em roleplay profundo e combate estratégico.',
    system: 'D&D 5e',
    image: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=400&h=300&fit=crop',
    members: 6,
    maxMembers: 8,
    gm: 'MestreÓdinn',
    createdAt: '15 de março de 2024',
    nextSession: 'Sábado, 20:00',
    tags: ['Roleplay', 'Combat', 'Weekly', 'Norse Mythology']
  };

  const members = [
    { id: 1, name: 'MestreÓdinn', role: 'GM', avatar: 'https://images.unsplash.com/photo-1501286353178-1ec881214838?w=100&h=100&fit=crop', online: true },
    { id: 2, name: 'ThorMartelo', role: 'Guerreiro', avatar: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=100&h=100&fit=crop', online: true },
    { id: 3, name: 'LokiTravesso', role: 'Ladino', avatar: 'https://images.unsplash.com/photo-1493962853295-0fd70327578a?w=100&h=100&fit=crop', online: false },
    { id: 4, name: 'FreyjaLuna', role: 'Clérigo', avatar: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=100&h=100&fit=crop', online: true }
  ];

  const defaultMessages = [
    { id: 1, sender: 'MestreÓdinn', content: 'Pessoal, não esqueçam que nossa próxima sessão é no sábado às 20h!', timestamp: '14:30', avatar: 'https://images.unsplash.com/photo-1501286353178-1ec881214838?w=100&h=100&fit=crop' },
    { id: 2, sender: 'ThorMartelo', content: 'Confirmado! Já estou ansioso para enfrentar aquele dragão 🐉', timestamp: '14:35', avatar: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=100&h=100&fit=crop' },
    { id: 3, sender: 'FreyjaLuna', content: 'Vou preparar algumas poções extras para a batalha', timestamp: '14:40', avatar: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=100&h=100&fit=crop' },
  ];

  const groupMessages = sessionState.groupMessages[id || '1'] || [];
  const allMessages = [...defaultMessages, ...groupMessages];

  const handleSendMessage = (message: string) => {
    if (user) {
      const newMessage = {
        sender: user.username,
        content: message,
        timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
        avatar: user.avatar
      };

      addGroupMessage(id || '1', newMessage);
    }
  };

  const handleJoinRequest = () => {
    toast({
      title: "Solicitação enviada!",
      description: "Sua solicitação para entrar no grupo foi enviada.",
    });
  };

  const handleSaveCharacter = (character: any) => {
    console.log('Character saved:', character);
    setShowCharacterCreation(false);
    toast({
      title: "Personagem salvo!",
      description: `${character.name} foi criado com sucesso.`,
    });
  };

  // Desktop layout with side-by-side chat and members
  if (!isMobile) {
    return (
      <ResponsiveLayout sidebar={<BottomNavigation />}>
        {/* Header */}
        <div className="rpg-gradient text-white">
          <div className="p-6">
            <Button
              variant="ghost"
              onClick={() => navigate('/groups')}
              className="text-white hover:bg-white/10 mb-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar
            </Button>

            <div className="flex items-start space-x-4">
              <img 
                src={group.image}
                alt={group.name}
                className="w-20 h-20 rounded-xl object-cover border-2 border-white/30"
              />
              <div className="flex-1">
                <h1 className="text-2xl font-bold mb-2">{group.name}</h1>
                <div className="flex flex-wrap gap-2 mb-3">
                  <Badge className="bg-white/20 text-white border-white/30">
                    {group.system}
                  </Badge>
                  {group.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center space-x-4 text-sm text-white/80">
                  <div className="flex items-center space-x-1">
                    <Users className="h-4 w-4" />
                    <span>{group.members}/{group.maxMembers}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>{group.nextSession}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Content */}
        <div className="flex h-[calc(100vh-200px)]">
          {/* Chat Panel */}
          <div className="flex-1">
            <GroupChatPanel
              groupId={id || '1'}
              messages={allMessages}
              members={members}
              onSendMessage={handleSendMessage}
            />
          </div>

          {/* Right Sidebar */}
          <div className="w-80 border-l border-primary/20 p-4 space-y-4 overflow-y-auto">
            <div>
              <h3 className="font-semibold text-secondary mb-3">Ações Rápidas</h3>
              <div className="space-y-2">
                <Button 
                  onClick={() => setShowCharacterCreation(true)}
                  className="w-full bg-primary hover:bg-primary-dark"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Criar Personagem
                </Button>
                <Button 
                  onClick={handleJoinRequest}
                  variant="outline" 
                  className="w-full"
                >
                  Solicitar Entrada
                </Button>
              </div>
            </div>

            {/* Group Info */}
            <Card className="p-4">
              <h4 className="font-semibold text-secondary mb-3">Informações</h4>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="text-secondary/60">Sistema:</span>
                  <p className="font-medium text-secondary">{group.system}</p>
                </div>
                <div>
                  <span className="text-secondary/60">Mestre:</span>
                  <p className="font-medium text-secondary">{group.gm}</p>
                </div>
                <div>
                  <span className="text-secondary/60">Próxima Sessão:</span>
                  <p className="font-medium text-secondary">{group.nextSession}</p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Character Creation Modal */}
        {showCharacterCreation && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <CharacterSheet
                  groupId={id || '1'}
                  onSave={handleSaveCharacter}
                  onCancel={() => setShowCharacterCreation(false)}
                  isEditing={true}
                />
              </div>
            </div>
          </div>
        )}
      </ResponsiveLayout>
    );
  }

  // Mobile layout with tabs
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-lighter/10 to-white pb-20">
      {/* Header */}
      <div className="rpg-gradient text-white">
        <div className="p-6">
          <Button
            variant="ghost"
            onClick={() => navigate('/groups')}
            className="text-white hover:bg-white/10 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>

          <div className="flex items-start space-x-4">
            <img 
              src={group.image}
              alt={group.name}
              className="w-20 h-20 rounded-xl object-cover border-2 border-white/30"
            />
            <div className="flex-1">
              <h1 className="text-2xl font-bold mb-2">{group.name}</h1>
              <div className="flex flex-wrap gap-2 mb-3">
                <Badge className="bg-white/20 text-white border-white/30">
                  {group.system}
                </Badge>
                {group.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
              <div className="flex items-center space-x-4 text-sm text-white/80">
                <div className="flex items-center space-x-1">
                  <Users className="h-4 w-4" />
                  <span>{group.members}/{group.maxMembers}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>{group.nextSession}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        <Tabs defaultValue="chat" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="chat">Chat</TabsTrigger>
            <TabsTrigger value="members">Membros</TabsTrigger>
            <TabsTrigger value="info">Info</TabsTrigger>
          </TabsList>

          <TabsContent value="chat" className="space-y-4">
            <div className="h-96">
              <GroupChatPanel
                groupId={id || '1'}
                messages={allMessages}
                members={members}
                onSendMessage={handleSendMessage}
                className="h-full"
              />
            </div>
          </TabsContent>

          <TabsContent value="members" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-secondary">Membros ({group.members})</h3>
              <Button size="sm" onClick={handleJoinRequest} className="bg-primary hover:bg-primary-dark">
                <Plus className="h-4 w-4 mr-2" />
                Solicitar Entrada
              </Button>
            </div>
            
            <div className="space-y-3">
              {members.map((member) => (
                <Card key={member.id} className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <img 
                        src={member.avatar}
                        alt={member.name}
                        className="w-12 h-12 rounded-full"
                      />
                      {member.online && (
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-secondary">{member.name}</h4>
                      <p className="text-sm text-secondary/60">{member.role}</p>
                    </div>
                    {member.role === 'GM' && (
                      <Badge variant="outline" className="text-primary border-primary">
                        GM
                      </Badge>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="info" className="space-y-4">
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-secondary mb-4">Sobre o Grupo</h3>
              <p className="text-secondary/70 mb-6">{group.description}</p>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-secondary/60">Sistema:</span>
                  <p className="font-medium text-secondary">{group.system}</p>
                </div>
                <div>
                  <span className="text-secondary/60">Mestre:</span>
                  <p className="font-medium text-secondary">{group.gm}</p>
                </div>
                <div>
                  <span className="text-secondary/60">Criado em:</span>
                  <p className="font-medium text-secondary">{group.createdAt}</p>
                </div>
                <div>
                  <span className="text-secondary/60">Próxima Sessão:</span>
                  <p className="font-medium text-secondary">{group.nextSession}</p>
                </div>
              </div>
            </Card>

            <Button 
              onClick={() => navigate(`/character-creation/${group.id}`)}
              className="w-full bg-primary hover:bg-primary-dark"
            >
              Criar Personagem para este Grupo
            </Button>
          </TabsContent>
        </Tabs>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default GroupDetail;
