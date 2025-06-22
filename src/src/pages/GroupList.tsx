
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import ResponsiveLayout from '@/components/layout/ResponsiveLayout';
import CreateGroupModal from '@/components/CreateGroupModal';
import { Search, Filter, Plus, Users, Clock, Grid2x2, List } from 'lucide-react';

const GroupList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

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
    },
    {
      id: 4,
      name: 'Cavaleiros da Mesa Redonda',
      description: 'Campanha medieval com foco em honra e cavalaria.',
      system: 'D&D 5e',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop',
      members: 5,
      maxMembers: 6,
      status: 'Recruiting',
      lastActivity: '4 horas atrás',
      tags: ['Medieval', 'Honor', 'Chivalry']
    },
    {
      id: 5,
      name: 'Piratas do Caribe Cósmico',
      description: 'Aventuras espaciais com piratas e tesouros galácticos.',
      system: 'Starfinder',
      image: 'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=300&h=200&fit=crop',
      members: 7,
      maxMembers: 8,
      status: 'Full',
      lastActivity: '1 hora atrás',
      tags: ['Pirates', 'Space', 'Adventure']
    },
    {
      id: 6,
      name: 'Mestres do Submundo',
      description: 'Campanha urbana com foco em crime organizado e política.',
      system: 'Shadowrun',
      image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=300&h=200&fit=crop',
      members: 4,
      maxMembers: 5,
      status: 'Recruiting',
      lastActivity: '6 horas atrás',
      tags: ['Urban', 'Crime', 'Politics']
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

  const sidebar = (
    <div className="p-6 space-y-6">
      <div>
        <h3 className="font-semibold text-secondary mb-3">Filtros</h3>
        <div className="space-y-3">
          <div>
            <label className="text-sm font-medium text-secondary/70 mb-1 block">Sistema</label>
            <select className="w-full p-2 border border-primary/20 rounded-md bg-white text-sm">
              <option>Todos os sistemas</option>
              <option>D&D 5e</option>
              <option>Pathfinder</option>
              <option>Starfinder</option>
              <option>Shadowrun</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-secondary/70 mb-1 block">Status</label>
            <select className="w-full p-2 border border-primary/20 rounded-md bg-white text-sm">
              <option>Todos</option>
              <option>Recrutando</option>
              <option>Completo</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-secondary/70 mb-1 block">Jogadores</label>
            <select className="w-full p-2 border border-primary/20 rounded-md bg-white text-sm">
              <option>Qualquer número</option>
              <option>1-3 jogadores</option>
              <option>4-6 jogadores</option>
              <option>7+ jogadores</option>
            </select>
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-secondary mb-3">Tags Populares</h3>
        <div className="flex flex-wrap gap-2">
          {['Roleplay', 'Combat', 'Story-Heavy', 'New Players', 'Weekly', 'Bi-weekly'].map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs cursor-pointer hover:bg-primary hover:text-white border-primary/30">
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-secondary mb-3">Estatísticas</h3>
        <div className="space-y-2 text-sm text-secondary/70">
          <div className="flex justify-between">
            <span>Total de grupos:</span>
            <span className="font-medium">{groups.length}</span>
          </div>
          <div className="flex justify-between">
            <span>Recrutando:</span>
            <span className="font-medium text-green-600">{groups.filter(g => g.status === 'Recruiting').length}</span>
          </div>
          <div className="flex justify-between">
            <span>Completos:</span>
            <span className="font-medium text-red-600">{groups.filter(g => g.status === 'Full').length}</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <ResponsiveLayout sidebar={sidebar}>
      {/* Desktop Header */}
      <div className="hidden md:block bg-white border-b border-primary/20">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-secondary">Grupos de RPG</h1>
              <p className="text-secondary/60 mt-1">Descubra e participe de aventuras épicas</p>
            </div>
            <Button 
              onClick={() => setShowCreateModal(true)}
              className="bg-primary hover:bg-primary-dark"
            >
              <Plus className="h-4 w-4 mr-2" />
              Criar Grupo
            </Button>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary/40 h-4 w-4" />
              <Input
                type="text"
                placeholder="Buscar grupos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-primary/20"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid2x2 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Header */}
      <div className="md:hidden rpg-gradient text-white p-6 rounded-b-3xl">
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
        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-secondary/60 text-sm">
            {filteredGroups.length} grupos encontrados
          </p>
          <div className="md:hidden flex items-center space-x-2">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('grid')}
            >
              <Grid2x2 className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('list')}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Groups Grid/List */}
        <div className={
          viewMode === 'grid' 
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
            : "space-y-4"
        }>
          {filteredGroups.map((group) => (
            <Card key={group.id} className="overflow-hidden hover:shadow-lg transition-all duration-200 border-primary/20 group">
              <div className="relative">
                <img 
                  src={group.image}
                  alt={group.name}
                  className={viewMode === 'grid' ? "w-full h-32 object-cover group-hover:scale-105 transition-transform duration-200" : "w-24 h-16 object-cover rounded"}
                />
                <div className="absolute top-3 right-3">
                  <Badge className={`${getStatusColor(group.status)} text-xs`}>
                    {getStatusText(group.status)}
                  </Badge>
                </div>
              </div>
              
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-secondary text-lg group-hover:text-primary transition-colors">
                    {group.name}
                  </h3>
                  <Badge variant="outline" className="text-xs border-primary text-primary ml-2 flex-shrink-0">
                    {group.system}
                  </Badge>
                </div>
                
                <p className="text-secondary/70 text-sm mb-3 line-clamp-2">
                  {group.description}
                </p>

                <div className="flex flex-wrap gap-1 mb-3">
                  {group.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {group.tags.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{group.tags.length - 3}
                    </Badge>
                  )}
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
                    <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary hover:text-white transition-colors">
                      Ver Detalhes
                    </Button>
                  </Link>
                  {group.status === 'Recruiting' && (
                    <Button className="bg-primary hover:bg-primary-dark transition-colors">
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
    </ResponsiveLayout>
  );
};

export default GroupList;
