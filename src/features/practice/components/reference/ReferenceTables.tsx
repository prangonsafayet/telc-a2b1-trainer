import { useMemo, useState } from 'react';

import { Search } from 'lucide-react';

import { CASE_LABELS } from '@shared/config/studyCategories.ts';
import { caseGroups } from '@shared/lib/studyItems.ts';
import { type VocabBank } from '@shared/types';
import {
  Badge,
  Card,
  CardContent,
  Input,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@shared/ui';

interface ReferenceTablesProps {
  readonly bank: VocabBank;
}

const matches = (query: string, ...fields: readonly string[]): boolean =>
  query === '' || fields.some(field => field.toLowerCase().includes(query));

const CASE_BADGE: Readonly<Record<string, 'default' | 'secondary' | 'warning'>> = {
  akkusativ: 'default',
  dativ: 'secondary',
  genitiv: 'warning'
};

/** Searchable study tables: every bank entry with its forms and English meaning. */
const ReferenceTables = ({ bank }: ReferenceTablesProps) => {
  const [search, setSearch] = useState('');
  const query = search.trim().toLowerCase();

  const groups = useMemo(() => caseGroups(bank.caseItems), [bank.caseItems]);

  return (
    <div className="space-y-4">
      <div className="relative max-w-sm">
        <Search
          className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden
        />
        <Input
          className="pl-8"
          placeholder="Search German or English…"
          aria-label="Search the reference tables"
          value={search}
          onChange={event => {
            setSearch(event.target.value);
          }}
        />
      </div>

      <Tabs defaultValue="verbs">
        <TabsList className="flex-wrap">
          <TabsTrigger value="verbs">Verben</TabsTrigger>
          <TabsTrigger value="nouns">Nomen</TabsTrigger>
          <TabsTrigger value="adjectives">Adjektive</TabsTrigger>
          <TabsTrigger value="prepVerbs">Verben + Präp.</TabsTrigger>
          <TabsTrigger value="cases">Kasus</TabsTrigger>
        </TabsList>

        <TabsContent value="verbs">
          <Card>
            <CardContent className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Infinitiv</TableHead>
                    <TableHead>Präsens (er/sie/es)</TableHead>
                    <TableHead>Präteritum</TableHead>
                    <TableHead>Perfekt</TableHead>
                    <TableHead>English</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bank.verbs
                    .filter(entry => matches(query, entry.de, entry.en, entry.perfekt))
                    .map(entry => (
                      <TableRow key={entry.id} title={`${entry.example.de} — ${entry.example.en}`}>
                        <TableCell className="font-medium">{entry.de}</TableCell>
                        <TableCell>{entry.praesens}</TableCell>
                        <TableCell>{entry.praeteritum}</TableCell>
                        <TableCell>{entry.perfekt}</TableCell>
                        <TableCell className="text-muted-foreground">{entry.en}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="nouns">
          <Card>
            <CardContent className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nomen</TableHead>
                    <TableHead>Plural</TableHead>
                    <TableHead>English</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bank.nouns
                    .filter(entry => matches(query, entry.de, entry.en))
                    .map(entry => (
                      <TableRow key={entry.id} title={`${entry.example.de} — ${entry.example.en}`}>
                        <TableCell className="font-medium">
                          <span className="text-muted-foreground">{entry.article}</span> {entry.de}
                        </TableCell>
                        <TableCell>{entry.plural}</TableCell>
                        <TableCell className="text-muted-foreground">{entry.en}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="adjectives">
          <Card>
            <CardContent className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Adjektiv</TableHead>
                    <TableHead>Komparativ</TableHead>
                    <TableHead>Superlativ</TableHead>
                    <TableHead>English</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bank.adjectives
                    .filter(entry => matches(query, entry.de, entry.en))
                    .map(entry => (
                      <TableRow key={entry.id} title={`${entry.example.de} — ${entry.example.en}`}>
                        <TableCell className="font-medium">{entry.de}</TableCell>
                        <TableCell>{entry.komparativ ?? '—'}</TableCell>
                        <TableCell>{entry.superlativ ?? '—'}</TableCell>
                        <TableCell className="text-muted-foreground">{entry.en}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="prepVerbs">
          <Card>
            <CardContent className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Verb</TableHead>
                    <TableHead>Präposition + Kasus</TableHead>
                    <TableHead>English</TableHead>
                    <TableHead>Beispiel</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bank.prepVerbs
                    .filter(entry => matches(query, entry.de, entry.en, entry.example.de))
                    .map(entry => (
                      <TableRow key={entry.id}>
                        <TableCell className="font-medium">{entry.verb}</TableCell>
                        <TableCell>
                          <Badge variant={CASE_BADGE[entry.kasus] ?? 'secondary'}>
                            {entry.preposition} + {CASE_LABELS[entry.kasus]}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-muted-foreground">{entry.en}</TableCell>
                        <TableCell className="max-w-72 text-sm" title={entry.example.en}>
                          {entry.example.de}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cases">
          <div className="space-y-4">
            {groups.map(group => (
              <Card key={group.kasus}>
                <CardContent className="overflow-x-auto">
                  <h3 className="mb-2 flex items-center gap-2 font-semibold">
                    <Badge variant={CASE_BADGE[group.kasus] ?? 'secondary'}>{CASE_LABELS[group.kasus]}</Badge>
                    <span className="text-sm font-normal text-muted-foreground">
                      {group.items.length} triggers
                    </span>
                  </h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Auslöser</TableHead>
                        <TableHead>English</TableHead>
                        <TableHead>Beispiel</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {group.items
                        .filter(entry => matches(query, entry.de, entry.en, entry.example.de))
                        .map(entry => (
                          <TableRow key={entry.id}>
                            <TableCell className="font-medium">{entry.de}</TableCell>
                            <TableCell className="text-muted-foreground">{entry.en}</TableCell>
                            <TableCell className="max-w-72 text-sm" title={entry.example.en}>
                              {entry.example.de}
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ReferenceTables;
