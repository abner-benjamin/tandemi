import React, { createContext, useContext, useState } from 'react';

type Language = 'en' | 'es';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Navigation
    "nav.dashboard": "Dashboard",
    "nav.all_goals": "All Goals", 
    "nav.contributions": "Contributions",
    "nav.family": "Family",
    "nav.settings": "Settings",
    
    // Dashboard
    "dashboard.welcome": "Welcome",
    "dashboard.your_goals": "Your Goals",
    "dashboard.no_goals": "No goals yet. Create your first goal!",
    "dashboard.contribution_history": "Contribution History",
    
    "language": "Language",
    "goal_card.remaining": "Remaining",
    "goal_card.due_date": "Due Date",
    "dashboard.create_goal": "Create a new goal",
    "create_goal.title": "Create a New Goal",
    "create_goal.goal_name": "Goal Name",
    "create_goal.amount": "Amount",
    "create_goal.category": "Category",
    "create_goal.due_date": "Due Date",
    "create_goal.description": "Description",
    "create_goal.create": "Create",
    "create_goal.cancel": "Cancel",
    "category.medical": "Medical",
    "category.education": "Education",
    "category.housing": "Housing",
    "category.other": "Other",
    "category.medical.helper": "For medical expenses, treatments, and healthcare",
    "category.education.helper": "For tuition, books, and educational materials",
    "category.housing.helper": "For rent, mortgage, and home repairs",
    "category.other.helper": "For any other type of goal",
    "goal_details.shared_goal": "Shared goal",
    "goal_details.progress": "Progress",
    "goal_details.target": "Target",
    "goal_details.remaining": "Remaining",
    "goal_details.goal_overview": "Goal Overview",
    "goal_details.no_description": "No description provided.",
    "goal_details.due_date": "Due Date",
    "goal_details.recent_contributions": "Recent Contributions",
    "goal_details.contributors_count": "Contributors",
    "goal_details.view_all": "View All",
    "goal_details.contributions": "Contributions",
    "goal_details.family": "Family",
    "goal_details.overview": "Overview",
    "goal_details.log_contribution": "Log Contribution",
    "contribution.empty": "No contributions yet.",
    "contribution.amount": "Amount",
    "contribution.date": "Date",
    "contribution.type": "Type",
    "contribution.purpose": "Purpose",
    "contribution.contributor": "Contributor",
    "contribution.note": "Note",
    "contribution.remittance": "Remittance",
    "contribution.cash": "Cash",
    "contribution.gift": "Gift",
    "contribution.enter_amount": "Enter amount",
    "contribution.select_type": "Select type",
    "contribution.enter_purpose": "Enter purpose",
    "contribution.enter_contributor": "Enter contributor",
    "contribution.enter_note": "Enter note",
    "contribution.add_contribution": "Add Contribution",
    "contribution.contribution_added": "Contribution added!",
    "contribution.contribution_failed": "Failed to add contribution.",
    "family.invite": "Invite Family",
    "family.empty": "No family members yet.",
    "family.name": "Name",
    "family.role": "Role",
    "family.contact_method": "Contact Method",
    "family.contact_value": "Contact Value",
    "family.admin": "Admin",
    "family.contributor": "Contributor",
    "family.viewer": "Viewer",
    "invite_family.title": "Invite Family Member",
    "invite_family.name": "Name",
    "invite_family.role": "Role",
    "invite_family.contact_method": "Contact Method",
    "invite_family.contact_value": "Contact Value",
    "invite_family.invite": "Invite",
    "invite_family.cancel": "Cancel",
    "invite_family.email": "Email",
    "invite_family.phone": "Phone",
    "invite_family.whatsapp": "WhatsApp",
    "invite_family.contact_placeholder": "Enter contact details",
    "invite_family.member_invited": "Family member invited!",
    "invite_family.invite_failed": "Failed to invite family member.",
  },
  es: {
    // Navigation
    "nav.dashboard": "Panel Principal",
    "nav.all_goals": "Todas las Metas",
    "nav.contributions": "Contribuciones", 
    "nav.family": "Familia",
    "nav.settings": "Configuración",
    
    // Dashboard
    "dashboard.welcome": "Bienvenido",
    "dashboard.your_goals": "Tus Metas",
    "dashboard.no_goals": "Aún no tienes metas. ¡Crea tu primera meta!",
    "dashboard.contribution_history": "Historial de Contribuciones",
    
    "language": "Idioma",
    "goal_card.remaining": "Restante",
    "goal_card.due_date": "Fecha Límite",
    "dashboard.create_goal": "Crear nueva meta",
    "create_goal.title": "Crear una Nueva Meta",
    "create_goal.goal_name": "Nombre de la Meta",
    "create_goal.amount": "Monto",
    "create_goal.category": "Categoría",
    "create_goal.due_date": "Fecha Límite",
    "create_goal.description": "Descripción",
    "create_goal.create": "Crear",
    "create_goal.cancel": "Cancelar",
    "category.medical": "Médico",
    "category.education": "Educación",
    "category.housing": "Vivienda",
    "category.other": "Otro",
    "category.medical.helper": "Para gastos médicos, tratamientos y atención médica",
    "category.education.helper": "Para matrícula, libros y materiales educativos",
    "category.housing.helper": "Para alquiler, hipoteca y reparaciones del hogar",
    "category.other.helper": "Para cualquier otro tipo de meta",
    "goal_details.shared_goal": "Meta compartida",
    "goal_details.progress": "Progreso",
    "goal_details.target": "Objetivo",
    "goal_details.remaining": "Restante",
    "goal_details.goal_overview": "Descripción de la Meta",
    "goal_details.no_description": "No se ha proporcionado una descripción.",
    "goal_details.due_date": "Fecha Límite",
    "goal_details.recent_contributions": "Contribuciones Recientes",
    "goal_details.contributors_count": "Contribuyentes",
    "goal_details.view_all": "Ver Todos",
    "goal_details.contributions": "Contribuciones",
    "goal_details.family": "Familia",
    "goal_details.overview": "Resumen",
    "goal_details.log_contribution": "Registrar Contribución",
    "contribution.empty": "Aún no hay contribuciones.",
    "contribution.amount": "Monto",
    "contribution.date": "Fecha",
    "contribution.type": "Tipo",
    "contribution.purpose": "Propósito",
    "contribution.contributor": "Contribuyente",
    "contribution.note": "Nota",
    "contribution.remittance": "Remesa",
    "contribution.cash": "Efectivo",
    "contribution.gift": "Regalo",
    "contribution.enter_amount": "Ingrese el monto",
    "contribution.select_type": "Seleccione el tipo",
    "contribution.enter_purpose": "Ingrese el propósito",
    "contribution.enter_contributor": "Ingrese el contribuyente",
    "contribution.enter_note": "Ingrese una nota",
    "contribution.add_contribution": "Agregar Contribución",
    "contribution.contribution_added": "¡Contribución agregada!",
    "contribution.contribution_failed": "No se pudo agregar la contribución.",
    "family.invite": "Invitar a un Familiar",
    "family.empty": "Aún no hay miembros de la familia.",
    "family.name": "Nombre",
    "family.role": "Rol",
    "family.contact_method": "Método de Contacto",
    "family.contact_value": "Valor de Contacto",
    "family.admin": "Administrador",
    "family.contributor": "Contribuyente",
    "family.viewer": "Espectador",
    "invite_family.title": "Invitar a un Miembro de la Familia",
    "invite_family.name": "Nombre",
    "invite_family.role": "Rol",
    "invite_family.contact_method": "Método de Contacto",
    "invite_family.contact_value": "Valor de Contacto",
    "invite_family.invite": "Invitar",
    "invite_family.cancel": "Cancelar",
    "invite_family.email": "Correo Electrónico",
    "invite_family.phone": "Teléfono",
    "invite_family.whatsapp": "WhatsApp",
    "invite_family.contact_placeholder": "Ingrese los detalles de contacto",
    "invite_family.member_invited": "¡Miembro de la familia invitado!",
    "invite_family.invite_failed": "No se pudo invitar al miembro de la familia.",
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: React.ReactNode;
}

const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>((localStorage.getItem('language') as Language) || 'en');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  React.useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const value: LanguageContextType = {
    language,
    setLanguage,
    t,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export { LanguageProvider, useLanguage };
