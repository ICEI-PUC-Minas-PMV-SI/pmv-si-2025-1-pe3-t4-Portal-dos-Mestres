
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

interface CreateGroupModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CreateGroupModal: React.FC<CreateGroupModalProps> = ({ open, onOpenChange }) => {
  const [groupName, setGroupName] = useState('');
  const [description, setDescription] = useState('');
  const [system, setSystem] = useState('');
  const [maxMembers, setMaxMembers] = useState('6');
  const [isLoading, setIsLoading] = useState(false);
  
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Grupo criado!",
        description: "Seu grupo foi criado com sucesso.",
      });
      onOpenChange(false);
      // Reset form
      setGroupName('');
      setDescription('');
      setSystem('');
      setMaxMembers('6');
      setIsLoading(false);
    }, 1000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Criar Novo Grupo</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="groupName">Nome do Grupo</Label>
            <Input
              id="groupName"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              placeholder="Os Aventureiros do Reino"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="system">Sistema de RPG</Label>
            <Select value={system} onValueChange={setSystem} required>
              <SelectTrigger>
                <SelectValue placeholder="Selecione um sistema" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dnd5e">D&D 5e</SelectItem>
                <SelectItem value="pathfinder">Pathfinder</SelectItem>
                <SelectItem value="starfinder">Starfinder</SelectItem>
                <SelectItem value="call-of-cthulhu">Call of Cthulhu</SelectItem>
                <SelectItem value="vampire">Vampire: The Masquerade</SelectItem>
                <SelectItem value="other">Outro</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="maxMembers">Número Máximo de Membros</Label>
            <Select value={maxMembers} onValueChange={setMaxMembers}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="3">3</SelectItem>
                <SelectItem value="4">4</SelectItem>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="6">6</SelectItem>
                <SelectItem value="7">7</SelectItem>
                <SelectItem value="8">8</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descreva seu grupo, estilo de jogo, expectativas..."
              rows={3}
              required
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isLoading} className="bg-primary hover:bg-primary-dark">
              {isLoading ? "Criando..." : "Criar Grupo"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateGroupModal;
