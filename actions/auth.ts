"use server";
import { createAdminClient, createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export default async function getUser() {
  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    return user;
  } catch (error) {
    console.error("Error getting user", error);
    return null;
  }
}


export async function updateProfileAction(
  id: string,
  prevState: { error?: string; success?: string } | null | undefined,
  formData: FormData,
) {
  const supabase = await createAdminClient();

  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  ``;
  try {
    const {
      data: { user },
      error,
    } = await supabase.auth.admin.updateUserById(id, {
      email: email,
      user_metadata: {
        name: name,
        phone: phone,
      },
    });

    if (error) {
      console.error("Error actualizando el perfil:", error);
      return { error: "Error actualizando el perfil" };
    }
    console.log("Perfil actualizado:", user);
    revalidatePath("/protected/profile");

    return { success: "Perfil actualizado" };
  } catch (error) {
    console.error("Error actualizando el perfil:", error);
  }
}
