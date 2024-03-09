import {
  AppRoot,
  PanelHeader,
  SplitCol,
  SplitLayout,
  usePlatform,
  AdaptivityProvider,
  ConfigProvider,
  View,
} from "@vkontakte/vkui";

import "@vkontakte/vkui/dist/vkui.css";
import { GroupPage } from "./components/GroupPage/GroupPage";
function App() {
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
