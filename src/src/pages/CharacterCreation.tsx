
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import BottomNavigation from '@/components/BottomNavigation';
import { ArrowLeft, Dice6, User, Book } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const CharacterCreation = () => {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [character, setCharacter] = useState({
    name: '',
    race: '',
    class: '',
    background: '',
    level: 1,
    strength: 10,
    dexterity: 10,
    constitution: 10,
    intelligence: 10,
    wisdom: 10,
    charisma: 10,
    backstory: '',
    appearance: '',
    personality: ''
  });

  const races = [
    'Humano', 'Elfo', 'Anão', 'Halfling', 'Draconato', 'Gnomo', 'Meio-Elfo', 'Meio-Orc', 'Tiefling'
  ];

  const classes = [
    'Guerreiro', 'Mago', 'Clérigo', 'Ladino', 'Ranger', 'Paladino', 'Bárbaro', 'Bardo', 'Bruxo', 'Feiticeiro', 'Druida', 'Monge'
  ];

  const backgrounds = [
    'Acólito', 'Criminoso', 'Artista', 'Eremita', 'Herói do Povo', 'Nobre', 'Forasteiro', 'Sábio', 'Soldado', 'Charlatão'
  ];

  const rollStats = () => {
    const rollStat = () => {
      const rolls = Array.from({ length: 4 }, () => Math.floor(Math.random() * 6) + 1);
      rolls.sort((a, b) => b - a);
      return rolls.slice(0, 3).reduce((sum, roll) => sum + roll, 0);
    };

    setCharacter(prev => ({
      ...prev,
      strength: rollStat(),
      dexterity: rollStat(),
      constitution: rollStat(),
      intelligence: rollStat(),
      wisdom: rollStat(),
      charisma: rollStat()
    }));

    toast({
      title: "Atributos rolados!",
      description: "Seus atributos foram gerados aleatoriamente.",
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Personagem criado!",
      description: `${character.name} foi criado com sucesso.`,
    });
    navigate(`/groups/${groupId}`);
  };

  const handleInputChange = (field: string, value: any) => {
    setCharacter(prev => ({ ...prev, [field]: value }));
  };

  const getModifier = (score: number) => {
    return Math.floor((score - 10) / 2);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-lighter/10 to-white pb-20">
      {/* Header */}
      <div className="rpg-gradient text-white p-6 rounded-b-3xl">
        <Button
          variant="ghost"
          onClick={() => navigate(`/groups/${groupId}`)}
          className="text-white hover:bg-white/10 mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar ao Grupo
        </Button>
        <h1 className="text-2xl font-bold">Criação de Personagem</h1>
        <p className="text-white/80">Crie seu herói para a aventura</p>
      </div>

      <div className="p-6">
        <form onSubmit={handleSubmit}>
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="basic">Básico</TabsTrigger>
              <TabsTrigger value="stats">Atributos</TabsTrigger>
              <TabsTrigger value="story">História</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-6">
              <Card className="p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <User className="h-5 w-5 text-primary" />
                  <h3 className="text-lg font-semibold">Informações Básicas</h3>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Nome do Personagem</Label>
                    <Input
                      id="name"
                      value={character.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Digite o nome do seu personagem"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="race">Raça</Label>
                      <Select value={character.race} onValueChange={(value) => handleInputChange('race', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione uma raça" />
                        </SelectTrigger>
                        <SelectContent>
                          {races.map((race) => (
                            <SelectItem key={race} value={race}>{race}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="class">Classe</Label>
                      <Select value={character.class} onValueChange={(value) => handleInputChange('class', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione uma classe" />
                        </SelectTrigger>
                        <SelectContent>
                          {classes.map((charClass) => (
                            <SelectItem key={charClass} value={charClass}>{charClass}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="background">Antecedente</Label>
                    <Select value={character.background} onValueChange={(value) => handleInputChange('background', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um antecedente" />
                      </SelectTrigger>
                      <SelectContent>
                        {backgrounds.map((bg) => (
                          <SelectItem key={bg} value={bg}>{bg}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="level">Nível</Label>
                    <Input
                      id="level"
                      type="number"
                      min="1"
                      max="20"
                      value={character.level}
                      onChange={(e) => handleInputChange('level', parseInt(e.target.value))}
                    />
                  </div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="stats" className="space-y-6">
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <Dice6 className="h-5 w-5 text-primary" />
                    <h3 className="text-lg font-semibold">Atributos</h3>
                  </div>
                  <Button type="button" onClick={rollStats} variant="outline" className="border-primary text-primary">
                    <Dice6 className="h-4 w-4 mr-2" />
                    Rolar Tudo
                  </Button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {[
                    { key: 'strength', label: 'Força' },
                    { key: 'dexterity', label: 'Destreza' },
                    { key: 'constitution', label: 'Constituição' },
                    { key: 'intelligence', label: 'Inteligência' },
                    { key: 'wisdom', label: 'Sabedoria' },
                    { key: 'charisma', label: 'Carisma' }
                  ].map(({ key, label }) => (
                    <div key={key} className="space-y-2">
                      <Label>{label}</Label>
                      <div className="flex items-center space-x-2">
                        <Input
                          type="number"
                          min="3"
                          max="18"
                          value={character[key as keyof typeof character] as number}
                          onChange={(e) => handleInputChange(key, parseInt(e.target.value))}
                          className="flex-1"
                        />
                        <div className="w-12 text-center text-sm font-medium text-secondary/70">
                          {getModifier(character[key as keyof typeof character] as number) >= 0 ? '+' : ''}
                          {getModifier(character[key as keyof typeof character] as number)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="story" className="space-y-6">
              <Card className="p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <Book className="h-5 w-5 text-primary" />
                  <h3 className="text-lg font-semibold">História do Personagem</h3>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="appearance">Aparência</Label>
                    <Textarea
                      id="appearance"
                      value={character.appearance}
                      onChange={(e) => handleInputChange('appearance', e.target.value)}
                      placeholder="Descreva a aparência física do seu personagem..."
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label htmlFor="personality">Personalidade</Label>
                    <Textarea
                      id="personality"
                      value={character.personality}
                      onChange={(e) => handleInputChange('personality', e.target.value)}
                      placeholder="Como seu personagem se comporta? Quais são seus traços marcantes?"
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label htmlFor="backstory">História Pessoal</Label>
                    <Textarea
                      id="backstory"
                      value={character.backstory}
                      onChange={(e) => handleInputChange('backstory', e.target.value)}
                      placeholder="Conte a história do seu personagem, seus objetivos e motivações..."
                      rows={4}
                    />
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="flex space-x-4 mt-6">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => navigate(`/groups/${groupId}`)}
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button 
              type="submit" 
              className="flex-1 bg-primary hover:bg-primary-dark"
            >
              Criar Personagem
            </Button>
          </div>
        </form>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default CharacterCreation;
