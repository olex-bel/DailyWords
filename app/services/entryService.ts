
import supabase from "./supabase";
import { parseDate } from '~/utils/date';

export const MAX_DAILY_ENTRIES = 5;

type ItemType = 'word' | 'idiom' | 'phrasal_verb';
type VerbAspect = 'pf' | 'impf';

export type PartOfSpeech =
  | 'noun'
  | 'verb'
  | 'adjective'
  | 'adverb'
  | 'idiom'        
  | 'phrase'
  | 'expression';

type EntryMeaning = {
    val: string;
    context: string;
};
type EntryGender = 'm' | 'f' | 'n';
type GrammaticalCase = 'nom' | 'gen' | 'dat' | 'acc' | 'loc' | 'ins';
type CaseRelation = {
    case: GrammaticalCase;
    marker: string;
};
type EntryRating = 'safe' | 'slang' | 'vulgar';

export type GrammarDetails = 
  | {
      pos: 'noun';
      gender: EntryGender;
      plural?: string;
      genitive?: string;
    }
  | {
      pos: 'verb';
      aspect: VerbAspect;
    }
  | {
      pos: 'adj' | 'adv';
      comparative?: string;
    }
  | {
      pos: 'prep' | 'phrasal_verb';
      cases: CaseRelation[];
    }
  | {
      pos: 'phrase' | 'idiom';
    };

export type RecentEntry = {
    id: number;
    content: string;
    created_at: Date | null;
}

export type Entry = {
    id: number;
    content: string;
    type: ItemType;
    meanings: EntryMeaning[];
    grammar: GrammarDetails;
    rating: EntryRating;
    stage: number;
    example: string;
};

export async function getDailyEntries(number_of_words: number) {
    const { data, error } = await supabase.rpc('get_daily_entries', { 'target_limit': number_of_words });

    if (error) {
        throw new Error(error.message);
    }

    return data as Entry[];
}

export async function getRecentEntries(number_of_words: number): Promise<RecentEntry[]> {
    const { data, error } = await supabase.rpc('get_recent_entries', { 'target_limit': number_of_words });

    if (error) {
        console.error('Error fetching recent entries:', error);
        return [];
    }

    return (data as any[]).map(entry => ({
        ...entry,
        created_at: parseDate(entry.created_at)
    })) as RecentEntry[];
}