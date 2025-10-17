import { createClient } from "@supabase/supabase-js";
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY
);

export const addNewNote = async (text: string) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data } = await supabase
    .from("notes")
    .insert({ text: text, completed: false, user_id: user?.id })
    .select();

  console.log(data);

  return data;
};

export const getAllNotesByUser = async (
  completed: boolean | undefined = undefined
) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const query = supabase
    .from("notes")
    .select("*")
    .eq("user_id", user?.id)
    .eq("is_visible", true).order("created_at", { ascending: true });

  if (completed !== undefined) {
    query.eq("completed", completed);
  }
  const { data, error } = await query;
  return { data, error };
};

export const deleteNote = async (id: number) => {
  const { data, error } = await supabase
    .from("notes")
    .update({ is_visible: false })
    .eq("id", id)
    .select();
  return { data, error };
};

export const updateNoteStatus = async (id: number, completed: boolean) => {
  const { data, error } = await supabase
    .from("notes")
    .update({ completed: completed })
    .eq("id", id)
    .select();

  return { data, error };
};
