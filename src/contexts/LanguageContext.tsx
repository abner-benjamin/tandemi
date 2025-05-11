
import { createContext, useContext, useState, ReactNode } from "react";

type LanguageContextType = {
  language: "en" | "es";
  setLanguage: (lang: "en" | "es") => void;
  t: (key: string) => string;
};

const translations = {
  // Splash Screen
  "app.tagline": {
    en: "Shared goals. Stronger families.",
    es: "Metas compartidas. Familias más fuertes."
  },
  // Navigation & Common
  "common.back": {
    en: "Back",
    es: "Atrás"
  },
  "common.cancel": {
    en: "Cancel",
    es: "Cancelar"
  },
  "common.save": {
    en: "Save",
    es: "Guardar"
  },
  "common.next": {
    en: "Next",
    es: "Siguiente"
  },
  "common.done": {
    en: "Done",
    es: "Listo"
  },
  "common.send": {
    en: "Send",
    es: "Enviar"
  },
  "common.error": {
    en: "Error",
    es: "Error"
  },
  "common.goal_not_found": {
    en: "Goal not found",
    es: "Meta no encontrada"
  },
  "common.return_to_dashboard": {
    en: "Return to Dashboard",
    es: "Volver al Panel"
  },
  // Dashboard
  "dashboard.welcome": {
    en: "Welcome",
    es: "Bienvenido"
  },
  "dashboard.create_goal": {
    en: "Create New Goal",
    es: "Crear Nueva Meta"
  },
  "dashboard.your_goals": {
    en: "Your Goals",
    es: "Tus Metas"
  },
  "dashboard.no_goals": {
    en: "You don't have any goals yet. Create your first goal to get started.",
    es: "Aún no tienes metas. Crea tu primera meta para comenzar."
  },
  // Goal Categories
  "category.medical": {
    en: "Medical",
    es: "Médico"
  },
  "category.education": {
    en: "Education",
    es: "Educación"
  },
  "category.housing": {
    en: "Housing",
    es: "Vivienda"
  },
  "category.travel": {
    en: "Travel",
    es: "Viaje"
  },
  "category.other": {
    en: "Other",
    es: "Otro"
  },
  // Create Goal
  "create_goal.title": {
    en: "Create Goal",
    es: "Crear Meta"
  },
  "create_goal.name": {
    en: "Goal Name",
    es: "Nombre de la Meta"
  },
  "create_goal.name_placeholder": {
    en: "Enter goal name",
    es: "Ingrese nombre de la meta"
  },
  "create_goal.amount": {
    en: "Target Amount",
    es: "Cantidad Objetivo"
  },
  "create_goal.amount_placeholder": {
    en: "Enter amount",
    es: "Ingrese cantidad"
  },
  "create_goal.date": {
    en: "Target Date",
    es: "Fecha Objetivo"
  },
  "create_goal.date_placeholder": {
    en: "Select date",
    es: "Seleccione fecha"
  },
  "create_goal.category": {
    en: "Category",
    es: "Categoría"
  },
  "create_goal.category_placeholder": {
    en: "Select category",
    es: "Seleccione categoría"
  },
  "create_goal.description": {
    en: "Description (optional)",
    es: "Descripción (opcional)"
  },
  "create_goal.description_placeholder": {
    en: "Enter a short description",
    es: "Ingrese una descripción breve"
  },
  "create_goal.success": {
    en: "Goal created!",
    es: "¡Meta creada!"
  },
  // Goal Details
  "goal_details.overview": {
    en: "Overview",
    es: "Resumen"
  },
  "goal_details.contributions": {
    en: "Contributions",
    es: "Contribuciones"
  },
  "goal_details.family": {
    en: "Family",
    es: "Familia"
  },
  "goal_details.progress": {
    en: "Progress",
    es: "Progreso"
  },
  "goal_details.target": {
    en: "Target",
    es: "Objetivo"
  },
  "goal_details.remaining": {
    en: "Remaining",
    es: "Restante"
  },
  "goal_details.due_date": {
    en: "Due Date",
    es: "Fecha Límite"
  },
  "goal_details.log_contribution": {
    en: "Log Contribution",
    es: "Registrar Contribución"
  },
  // Contribution
  "contribution.title": {
    en: "Log Contribution",
    es: "Registrar Contribución"
  },
  "contribution.amount": {
    en: "Amount",
    es: "Cantidad"
  },
  "contribution.date": {
    en: "Date",
    es: "Fecha"
  },
  "contribution.type": {
    en: "Type",
    es: "Tipo"
  },
  "contribution.type.cash": {
    en: "Cash",
    es: "Efectivo"
  },
  "contribution.type.remittance": {
    en: "Remittance",
    es: "Remesa"
  },
  "contribution.type.gift": {
    en: "Gift",
    es: "Regalo"
  },
  "contribution.purpose": {
    en: "Purpose",
    es: "Propósito"
  },
  "contribution.purpose.groceries": {
    en: "Groceries",
    es: "Comestibles"
  },
  "contribution.purpose.medical": {
    en: "Medical",
    es: "Médico"
  },
  "contribution.purpose.rent": {
    en: "Rent",
    es: "Renta"
  },
  "contribution.purpose.education": {
    en: "Education",
    es: "Educación"
  },
  "contribution.purpose.celebration": {
    en: "Celebration",
    es: "Celebración"
  },
  "contribution.purpose.other": {
    en: "Other",
    es: "Otro"
  },
  "contribution.note": {
    en: "Note (optional)",
    es: "Nota (opcional)"
  },
  "contribution.success": {
    en: "Contribution logged!",
    es: "¡Contribución registrada!"
  },
  "contribution.add_another": {
    en: "Add Another",
    es: "Agregar Otra"
  },
  "contribution.empty": {
    en: "Every little bit counts. Add your first contribution to move your family goal forward.",
    es: "Cada granito de arena cuenta. Agrega tu primera contribución para avanzar hacia la meta familiar."
  },
  // Family
  "family.invite": {
    en: "Invite a Family Member",
    es: "Invitar a un Familiar"
  },
  "family.empty": {
    en: "No family members added yet",
    es: "Aún no se han agregado familiares"
  },
  "family.name": {
    en: "Name",
    es: "Nombre"
  },
  "family.role": {
    en: "Role",
    es: "Rol"
  },
  "family.role.admin": {
    en: "Admin",
    es: "Administrador"
  },
  "family.role.contributor": {
    en: "Contributor",
    es: "Colaborador"
  },
  "family.role.viewer": {
    en: "Viewer",
    es: "Observador"
  },
  "family.contact": {
    en: "Contact Method",
    es: "Método de Contacto"
  },
  "family.contact.email": {
    en: "Email",
    es: "Correo Electrónico"
  },
  "family.contact.phone": {
    en: "Phone",
    es: "Teléfono"
  },
  "family.contact.whatsapp": {
    en: "WhatsApp",
    es: "WhatsApp"
  },
  "family.message": {
    en: "Message (optional)",
    es: "Mensaje (opcional)"
  },
  "family.invitation_sent": {
    en: "Invitation sent to",
    es: "Invitación enviada a"
  },
  "family.add_another": {
    en: "Add Another",
    es: "Agregar Otro"
  },
  "family.return_to_goal": {
    en: "Return to Goal",
    es: "Volver a la Meta"
  },
  "family.add_member": {
    en: "Add Member",
    es: "Agregar miembro"
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<"en" | "es">("en");

  const t = (key: string): string => {
    const translation = translations[key as keyof typeof translations];
    if (!translation) {
      console.warn(`Translation key not found: ${key}`);
      return key;
    }
    return translation[language];
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
