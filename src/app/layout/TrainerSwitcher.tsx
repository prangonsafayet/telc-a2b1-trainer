import { Check, ChevronsUpDown, GraduationCap } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

import { TRAINER_ORDER, TRAINERS, trainerFromPath, trainerHome } from '@shared/config/trainers.ts';
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@shared/ui';

/** Switches between the three trainers; each one owns its own area of the app. */
const TrainerSwitcher = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const active = trainerFromPath(pathname);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-1.5" aria-label="Switch trainer">
          <GraduationCap className="size-4 text-primary" aria-hidden />
          <span className="font-semibold">{TRAINERS[active].short}</span>
          <ChevronsUpDown className="size-3.5 text-muted-foreground" aria-hidden />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-64">
        <DropdownMenuLabel>Trainers</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {TRAINER_ORDER.map(id => {
          const trainer = TRAINERS[id];
          return (
            <DropdownMenuItem
              key={id}
              onSelect={() => {
                void navigate(trainerHome(id));
              }}
              className="items-start gap-2 py-2"
            >
              <Check className={`mt-0.5 size-4 shrink-0 ${id === active ? '' : 'invisible'}`} aria-hidden />
              {/* Name and route only — this menu lists every trainer at once, and only the
                  active one's content has (or will have) loaded. */}
              <span className="font-medium">{trainer.name}</span>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TrainerSwitcher;
