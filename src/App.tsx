import {
  AppRoot,
  PanelHeader,
  SplitCol,
  SplitLayout,
  usePlatform,
  AdaptivityProvider,
  ConfigProvider,
  ModalRoot,
  ModalCard,
  Spacing,
  ButtonGroup,
  Button,
} from "@vkontakte/vkui";

import "@vkontakte/vkui/dist/vkui.css";
import { GroupPage } from "./components/GroupPage/GroupPage";
import { setOnboarded } from "./utils/onboarding";
import { useOnboardingStore } from "./stores/onboarding-store";
import {
  Icon56CheckCircleOutline,
  Icon56HandPointUpLeftOutline,
} from "@vkontakte/icons";
function App() {
  const onboardingStore = useOnboardingStore();

  const platform = usePlatform();
  const dismissOnboarding = () => {
    onboardingStore.setModalId("");
    setOnboarded();
  };
  const confirmOnboarding = () => {
    onboardingStore.setModalId("onboardingInvite");
    onboardingStore.startOnboarding();
  };

  const onboardingModal = (
    <ModalRoot activeModal={onboardingStore.modalId}>
      <ModalCard
        id="onboardingInvite"
        icon={<Icon56HandPointUpLeftOutline />}
        header="Показать как пользоваться страницей?"
        subheader="Краткий гайд о том, как выбрать нужные игры с помощью блока фильтров"
        dismissButtonMode={"inside"}
        onClick={dismissOnboarding}
        actions={
          <>
            <Spacing size={16} />
            <ButtonGroup mode="horizontal" gap="s" stretched>
              <Button
                size="l"
                mode="secondary"
                stretched
                onClick={dismissOnboarding}
              >
                Нет, спасибо
              </Button>
              <Button
                size="l"
                mode="primary"
                stretched
                onClick={confirmOnboarding}
              >
                Да, давайте
              </Button>
            </ButtonGroup>
          </>
        }
      ></ModalCard>
      <ModalCard
        id="onboardingFinish"
        icon={<Icon56CheckCircleOutline />}
        header="На этом всё!"
        dismissButtonMode={"inside"}
        actions={
          <>
            <Spacing size={16} />
            <Button
              size="l"
              mode="primary"
              stretched
              onClick={onboardingStore.nextStep}
            >
              Здорово!
            </Button>
          </>
        }
      ></ModalCard>
    </ModalRoot>
  );

  return (
    <ConfigProvider>
      <AdaptivityProvider>
        <AppRoot>
          <SplitLayout
            header={platform !== "vkcom" && <PanelHeader delimiter="none" />}
            modal={onboardingModal}
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
