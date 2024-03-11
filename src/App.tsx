import {
  AppRoot,
  PanelHeader,
  SplitCol,
  SplitLayout,
  usePlatform,
  AdaptivityProvider,
  ConfigProvider,
} from "@vkontakte/vkui";

import "@vkontakte/vkui/dist/vkui.css";
import { GroupPage } from "./components/GroupPage/GroupPage";
import { useEffect } from "react";
import { getOnboarded } from "./utils/onboarding";
import { useOnboardingStore } from "./stores/onboarding-store";
function App() {
  const onboardingStore = useOnboardingStore();
  useEffect(() => {
    const onboarded = getOnboarded();
    onboardingStore.setOnboarded(onboarded === "true");
    if (!onboarded) onboardingStore.startOnboarding();
  }, []);
  const platform = usePlatform();

  return (
    <ConfigProvider>
      <AdaptivityProvider>
        <AppRoot>
          <SplitLayout
            header={platform !== "vkcom" && <PanelHeader delimiter="none" />}
          >
            <SplitCol autoSpaced>
              <GroupPage />
            </SplitCol>
          </SplitLayout>
        </AppRoot>
      </AdaptivityProvider>
    </ConfigProvider>
  );
}

export default App;
