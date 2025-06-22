
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import BottomNavigation from '@/components/BottomNavigation';
import CreateGroupModal from '@/components/CreateGroupModal';
import { Search, Filter, Plus, Users, Clock } from 'lucide-react';

const GroupList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);

  const groups = [
    {
      id: 1,
      name: 'Os Guardiões de Asgard',
      description: 'Campanha épica de D&D 5e com foco em roleplay e combate estratégico.',
      system: 'D&D 5e',
      image: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=300&h=200&fit=crop',
      members: 6,
      maxMembers: 8,
      status: 'Recruiting',
      lastActivity: '2 horas atrás',
      tags: ['Roleplay', 'Combat', 'Weekly']
    },
    {
      id: 2,
      name: 'Irmandade da Chama',
      description: 'Aventuras em Pathfinder com histórias profundas e personagens complexos.',
      system: 'Pathfinder',
      image: 'https://images.unsplash.com/photo-1493962853295-0fd70327578a?w=300&h=200&fit=crop',
      members: 4,
      maxMembers: 6,
      status: 'Full',
      lastActivity: '1 dia atrás',
      tags: ['Story-Heavy', 'Character Development']
    },
    {
      id: 3,
      name: 'Exploradores do Vazio',
      description: 'Sci-fi adventures no universo de Starfinder.',
      system: 'Starfinder',
      image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=300&h=200&fit=crop',
      members: 3,
      maxMembers: 5,
      status: 'Recruiting',
      lastActivity: '3 horas atrás',
      tags: ['Sci-Fi', 'Exploration', 'New Players Welcome']
    }
  ];

  const filteredGroups = groups.filter(group =>
    group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    group.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    group.system.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Recruiting': return 'bg-green-100 text-green-800 border-green-200';
      case 'Full': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'Recruiting': return 'Recrutando';
      case 'Full': return 'Completo';
      default: return status;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-lighter/10 to-white pb-20">
      {/* Header */}
      <div className="rpg-gradient text-white p-6 rounded-b-3xl">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Grupos de RPG</h1>
          <Button 
            onClick={() => setShowCreateModal(true)}
            className="bg-white/20 hover:bg-white/30 text-white border-white/30"
          >
            <Plus className="h-4 w-4 mr-2" />
            Criar
          </Button>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary/60 h-4 w-4" />
          <Input
            type="text"
            placeholder="Buscar grupos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 h-12 bg-white/90 border-white/30 text-secondary"
          />
          <Button 
            variant="ghost" 
            size="sm" 
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-primary/60 hover:text-primary"
          >
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="p-6">
        {/* Results */}
        <div className="mb-4">
          <p className="text-secondary/60 text-sm">
            {filteredGroups.length} grupos encontrados
          </p>
        </div>

        {/* Groups Grid */}
        <div className="space-y-4">
          {filteredGroups.map((group) => (
            <Card key={group.id} className="overflow-hidden hover:shadow-lg transition-shadow border-primary/20">
              <div className="relative">
                <img 
                  src={group.image}
                  alt={group.name}
                  className="w-full h-32 object-cover"
                />
                <div className="absolute top-3 right-3">
                  <Badge className={`${getStatusColor(group.status)} text-xs`}>
                    {getStatusText(group.status)}
                  </Badge>
                </div>
              </div>
              
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-secondary text-lg">{group.name}</h3>
                  <Badge variant="outline" className="text-xs border-primary text-primary">
                    {group.system}
                  </Badge>
                </div>
                
                <p className="text-secondary/70 text-sm mb-3 line-clamp-2">
                  {group.description}
                </p>

                <div className="flex flex-wrap gap-1 mb-3">
                  {group.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between text-sm text-secondary/60 mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>{group.members}/{group.maxMembers}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{group.lastActivity}</span>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Link to={`/groups/${group.id}`} className="flex-1">
                    <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary hover:text-white">
                      Ver Detalhes
                    </Button>
                  </Link>
                  {group.status === 'Recruiting' && (
                    <Button className="bg-primary hover:bg-primary-dark">
                      Solicitar Entrada
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <CreateGroupModal open={showCreateModal} onOpenChange={setShowCreateModal} />
      <BottomNavigation />
    </div>
  );
};

export default GroupList;
