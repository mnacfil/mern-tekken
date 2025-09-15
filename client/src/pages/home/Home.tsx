import AuthCTAStep from "@/components/AuthCTAStep";
import ReadyStep from "@/components/ReadyStep";
import StartStep from "@/components/StartStep";
import { useHome } from "@/context/home-context";

const HomePage = () => {
  const { currentStep } = useHome();

  return (
    <div className="h-full flex flex-col justify-center items-center pb-52">
      {currentStep === "call-to-action" && <AuthCTAStep />}
      {currentStep === "ready" && <ReadyStep />}
      {currentStep === "start" && <StartStep />}
    </div>
  );
};

export default HomePage;
