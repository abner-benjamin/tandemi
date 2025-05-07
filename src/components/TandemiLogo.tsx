
type TandemiLogoProps = {
  size?: "sm" | "md" | "lg";
  variant?: "icon" | "full";
};

const TandemiLogo = ({ size = "md", variant = "full" }: TandemiLogoProps) => {
  const getSizeClass = () => {
    switch (size) {
      case "sm":
        return variant === "icon" ? "w-8 h-8" : "h-8";
      case "lg":
        return variant === "icon" ? "w-16 h-16" : "h-16";
      default:
        return variant === "icon" ? "w-12 h-12" : "h-12";
    }
  };
  
  return (
    <div className="flex items-center">
      <img 
        src="/lovable-uploads/01442081-0592-44b0-9a27-5f412f1cd3bc.png" 
        alt="Tandemi Logo" 
        className={getSizeClass()}
      />
      {variant === "full" && (
        <span className="ml-2 font-bold text-2xl text-tandemi-pink">Tandemi</span>
      )}
    </div>
  );
};

export default TandemiLogo;
