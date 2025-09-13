import AuthCTAStep from "@/components/AuthCTAStep";
import ReadyStep from "@/components/ReadyStep";
import StartStep from "@/components/StartStep";
import { useHome } from "@/context/home-context";

const HomePage = () => {
  const { currentStep, isSignedIn } = useHome();

  return (
    <div className="h-full flex justify-center items-center pb-52">
      {isSignedIn && currentStep === "ready" && <ReadyStep />}
      {isSignedIn && currentStep === "start" && <StartStep />}
      {!isSignedIn && <AuthCTAStep />}
    </div>
  );
};

export default HomePage;
