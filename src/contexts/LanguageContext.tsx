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
  "dashboard.contributions_chart": {
    en: "Family Contributions Over Time",
    es: "Historial de contribuciones familiares"
  },
  "dashboard.contributions_chart_simple": {
    en: "Family Contributions",
    es: "Contribuciones familiares"
  },
  "dashboard.contributions_chart_title": {
    en: "Contribution History",
    es: "Historial de contribuciones"
  },
  "dashboard.total_contributions": {
    en: "contributed across all goals",
    es: "contribuidos entre todas las metas"
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
  "goal_details.recent_contributions": {
    en: "Recent Contributions",
    es: "Contribuciones recientes"
  },
  "goal_details.contributors_count": {
    en: "family members have contributed",
    es: "miembros de la familia han contribuido"
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
  "goal_details.no_description": {
    en: "No description provided for this goal.",
    es: "No se proporcionó descripción para esta meta."
  },
  "goal_details.view_all": {
    en: "View all",
    es: "Ver todo"
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
  "family.role.admin.description": {
    en: "Can create and manage goals, and invite family members",
    es: "Puede crear y administrar metas, y añadir miembros de la familia"
  },
  "family.role.contributor.description": {
    en: "Can send and log contributions",
    es: "Puede enviar y registrar contribuciones"
  },
  "family.role.viewer.description": {
    en: "Can only view goal progress",
    es: "Solo puede ver el progreso de la meta"
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
  },
  "contribution.type.bank_transfer": {
    en: "Bank Transfer",
    es: "Transferencia bancaria"
  },
  "contribution.type.mobile_payment": {
    en: "Mobile Payment",
    es: "Pago móvil"
  },
  "contribution.type.cash.description": {
    en: "Physical cash given directly",
    es: "Efectivo entregado directamente"
  },
  "contribution.type.remittance.description": {
    en: "Sent via Western Union, Ria, or similar",
    es: "Enviado por Western Union, Ria u otro servicio"
  },
  "contribution.type.bank_transfer.description": {
    en: "Sent through Zelle or a bank account",
    es: "Enviado a través de Zelle o banco"
  },
  "contribution.type.mobile_payment.description": {
    en: "Sent via Venmo, PayPal, or CashApp",
    es: "Enviado por Venmo, PayPal, CashApp u otro"
  },
  "contribution.type.gift.description": {
    en: "Support given as goods, services, or food",
    es: "Apoyo en especie como alimentos o bienes"
  },
  
  // Contribution recurring options
  "contribution.repeat": {
    en: "Repeat this contribution",
    es: "Repetir esta contribución"
  },
  "contribution.frequency": {
    en: "Frequency",
    es: "Frecuencia"
  },
  "contribution.frequency.monthly": {
    en: "Monthly",
    es: "Mensual"
  },
  "contribution.frequency.weekly": {
    en: "Weekly",
    es: "Semanal"
  },
  "contribution.frequency.custom": {
    en: "Custom",
    es: "Personalizado"
  },
  "contribution.frequency.helper": {
    en: "We'll remind you when it's time to log your next contribution.",
    es: "Te recordaremos cuándo registrar tu próxima contribución."
  },
  "contribution.custom_days": {
    en: "Days between contributions",
    es: "Días entre contribuciones"
  },
  "contribution.custom_days_placeholder": {
    en: "Enter number of days",
    es: "Ingrese número de días"
  },
  
  // New goal categories
  "category.emergency": {
    en: "Emergency",
    es: "Emergencia"
  },
  "category.emergency.helper": {
    en: "For urgent needs like health issues or home repairs",
    es: "Para necesidades urgentes como salud o reparaciones"
  },
  "category.groceries": {
    en: "Groceries",
    es: "Comida"
  },
  "category.groceries.helper": {
    en: "For help with weekly or monthly food costs",
    es: "Para apoyar con gastos de comida"
  },
  "category.bills": {
    en: "Bills",
    es: "Servicios"
  },
  "category.bills.helper": {
    en: "For help paying utilities like electricity or internet",
    es: "Para ayudar con luz, internet o gas"
  },
  "category.celebration": {
    en: "Celebration",
    es: "Celebración"
  },
  "category.celebration.helper": {
    en: "For birthdays, holidays, or special family events",
    es: "Para cumpleaños, fiestas u ocasiones especiales"
  },
  "category.childcare": {
    en: "Childcare",
    es: "Cuidado infantil"
  },
  "category.childcare.helper": {
    en: "For daycare, school supplies, or child support",
    es: "Para guardería, útiles escolares o apoyo infantil"
  },
  "category.migration": {
    en: "Migration",
    es: "Migración"
  },
  "category.migration.helper": {
    en: "For legal fees, travel, or documentation costs",
    es: "Para trámites legales, viajes o documentos"
  },
  
  // Goal Details - Additional translations
  "goal_details.shared_goal": {
    en: "Shared goal with your family",
    es: "Meta compartida con tu familia"
  },
  "goal_details.goal_overview": {
    en: "Goal Overview",
    es: "Resumen de la meta"
  },
  "goal_details.contributors": {
    en: "Contributors",
    es: "Contribuyentes"
  },
  "goal_details.family_members": {
    en: "family members",
    es: "miembros de la familia"
  },
  
  // Category helpers for existing categories
  "category.medical.helper": {
    en: "For doctor visits, treatments, or medication costs",
    es: "Para consultas médicas, tratamientos o medicinas"
  },
  "category.education.helper": {
    en: "For school fees, supplies, or tuition support",
    es: "Para colegiaturas, útiles escolares o apoyo educativo"
  },
  "category.housing.helper": {
    en: "For rent, home repairs, or shared living expenses",
    es: "Para renta, reparaciones del hogar o gastos compartidos"
  },
  "category.travel.helper": {
    en: "For family visits, emergencies, or relocation costs",
    es: "Para viajes familiares, emergencias o gastos de traslado"
  },
  "category.other.helper": {
    en: "For anything that doesn't fit another category",
    es: "Para cualquier otro gasto no cubierto por las categorías anteriores"
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
