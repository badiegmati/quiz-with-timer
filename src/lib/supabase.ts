import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://vjzgdwiknhcsuoulbzfi.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZqemdkd2lrbmhjc3VvdWxiemZpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAzNTI1MjQsImV4cCI6MjA3NTkyODUyNH0.hOCyx_f6NXfei1iexd_4insZO7yg9Bd4Qzom32JT8C0';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Student {
  id: string;
  first_name: string;
  last_name: string;
  age: number;
  created_at: string;
}

export interface QuizResult {
  id: string;
  student_id: string;
  score: number;
  total_questions: number;
  answers: QuizAnswer[];
  completed_at: string;
}

export interface QuizAnswer {
  question: string;
  userAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
}
