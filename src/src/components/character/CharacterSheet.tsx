
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Edit, Save, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Character {
  id: string;
  name: string;
  class: string;
  race: string;
  level: number;
  stats: {
    strength: number;
    dexterity: number;
    constitution: number;
    intelligence: number;
    wisdom: number;
    charisma: number;
  };
  backstory: string;
  avatar: string;
  groupId: string;
}

interface CharacterSheetProps {
  character?: Character;
  groupId: string;
  onSave: (character: Character) => void;
  onCancel?: () => void;
  isEditing?: boolean;
}

const CharacterSheet: React.FC<CharacterSheetProps> = ({ 
  character, 
  groupId, 
  onSave, 
  onCancel,
  isEditing = false 
}) => {
  const [editMode, setEditMode] = useState(isEditing || !character);
  const [formData, setFormData] = useState<Partial<Character>>({
    name: character?.name || '',
    class: character?.class || '',
    race: character?.race || '',
    level: character?.level || 1,
    stats: character?.stats || {
      strength: 10,
      dexterity: 10,
      constitution: 10,
      intelligence: 10,
      wisdom: 10,
      charisma: 10
    },
    backstory: character?.backstory || '',
    avatar: character?.avatar || 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&h=150&fit=crop',
    groupId
  });

  const { toast } = useToast();

  const classes = ['Guerreiro', 'Mago', 'Ladino', 'Clérigo', 'Ranger', 'Paladino', 'Bárbaro', 'Bardo'];
  const races = ['Humano', 'Elfo', 'Anão', 'Halfling', 'Orc', 'Tiefling', 'Dragonborn', 'Gnomo'];

  const handleSave = () => {
    if (!formData.name || !formData.class || !formData.race) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha nome, classe e raça do personagem.",
        variant: "destructive"
      });
      return;
    }

    const characterData: Character = {
      id: character?.id || Date.now().toString(),
      name: formData.name!,
      class: formData.class!,
      race: formData.race!,
      level: formData.level!,
      stats: formData.stats!,
      backstory: formData.backstory!,
      avatar: formData.avatar!,
      groupId
    };

    onSave(characterData);
    setEditMode(false);
    
    toast({
      title: "Personagem salvo!",
      description: `${characterData.name} foi ${character ? 'atualizado' : 'criado'} com sucesso.`,
    });
  };

  const handleCancel = () => {
    if (character) {
      setFormData({
        name: character.name,
        class: character.class,
        race: character.race,
        level: character.level,
        stats: character.stats,
        backstory: character.backstory,
        avatar: character.avatar,
        groupId
      });
      setEditMode(false);
    } else if (onCancel) {
      onCancel();
    }
  };

  const updateStat = (stat: keyof Character['stats'], value: number) => {
    setFormData(prev => ({
      ...prev,
      stats: {
        ...prev.stats!,
        [stat]: Math.max(1, Math.min(20, value))
      }
    }));
  };

  if (!editMode && character) {
    return (
      <Card className="p-6">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center space-x-4">
            <img 
              src={character.avatar}
              alt={character.name}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <h3 className="text-xl font-bold text-secondary">{character.name}</h3>
              <div className="flex items-center space-x-2 mt-1">
                <Badge variant="outline">{character.race}</Badge>
                <Badge>{character.class}</Badge>
                <Badge variant="secondary">Nível {character.level}</Badge>
              </div>
            </div>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setEditMode(true)}
          >
            <Edit className="h-4 w-4 mr-2" />
            Editar
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          {Object.entries(character.stats).map(([stat, value]) => (
            <div key={stat} className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="text-sm text-secondary/60 capitalize">{stat}</div>
              <div className="text-xl font-bold text-secondary">{value}</div>
            </div>
          ))}
        </div>

        {character.backstory && (
          <div>
            <h4 className="font-semibold text-secondary mb-2">História</h4>
            <p className="text-secondary/70 text-sm leading-relaxed">{character.backstory}</p>
          </div>
        )}
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-secondary">
            {character ? 'Editar Personagem' : 'Criar Personagem'}
          </h3>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={handleCancel}>
              <X className="h-4 w-4 mr-2" />
              Cancelar
            </Button>
            <Button size="sm" onClick={handleSave} className="bg-primary hover:bg-primary-dark">
              <Save className="h-4 w-4 mr-2" />
              Salvar
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Nome do Personagem</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Nome do personagem"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="race">Raça</Label>
                <Select value={formData.race} onValueChange={(value) => setFormData(prev => ({ ...prev, race: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a raça" />
                  </SelectTrigger>
                  <SelectContent>
                    {races.map(race => (
                      <SelectItem key={race} value={race}>{race}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="class">Classe</Label>
                <Select value={formData.class} onValueChange={(value) => setFormData(prev => ({ ...prev, class: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a classe" />
                  </SelectTrigger>
                  <SelectContent>
                    {classes.map(cls => (
                      <SelectItem key={cls} value={cls}>{cls}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="level">Nível</Label>
              <Input
                id="level"
                type="number"
                min="1"
                max="20"
                value={formData.level}
                onChange={(e) => setFormData(prev => ({ ...prev, level: parseInt(e.target.value) || 1 }))}
              />
            </div>
          </div>

          <div className="space-y-4">
            <Label>Atributos</Label>
            <div className="grid grid-cols-2 gap-3">
              {Object.entries(formData.stats || {}).map(([stat, value]) => (
                <div key={stat}>
                  <Label className="text-xs capitalize">{stat}</Label>
                  <Input
                    type="number"
                    min="1"
                    max="20"
                    value={value}
                    onChange={(e) => updateStat(stat as keyof Character['stats'], parseInt(e.target.value) || 1)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <Label htmlFor="backstory">História do Personagem</Label>
          <Textarea
            id="backstory"
            value={formData.backstory}
            onChange={(e) => setFormData(prev => ({ ...prev, backstory: e.target.value }))}
            placeholder="Descreva a história e personalidade do seu personagem..."
            rows={4}
          />
        </div>
      </div>
    </Card>
  );
};

export default CharacterSheet;
