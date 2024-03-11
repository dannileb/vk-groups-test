import {
  Group,
  Header,
  OnboardingTooltip,
  Panel,
  PanelHeader,
  PanelSpinner,
  Placeholder,
  Separator,
  Spacing,
  View,
} from "@vkontakte/vkui";
import { GroupList } from "../GroupList/GroupList";
import { useGroups } from "../../hooks/useGroups";
import {
  Icon56CancelCircleOutline,
  Icon56UsersOutline,
} from "@vkontakte/icons";
import { FiltersBar } from "../FiltersBar/FiltersBar";
import { useGroupFiltersStore } from "../../stores/group-store";
import { useOnboardingStore } from "../../stores/onboarding-store";
export const GroupPage = () => {
  const groups = useGroups(["avatar_color", "closed"]);
  const groupsFiltersStore = useGroupFiltersStore();
  const onboardingStore = useOnboardingStore();
  return (
    <View activePanel="groups">
      <Panel
        id="groups"
        aria-live="polite"
        aria-busy={!groups.response?.result}
      >
        <PanelHeader>Мои группы</PanelHeader>
        {groups.response?.status ? (
          <>
            {groups.response.status === 200 ? (
              <Group>
                <Group
                  header={<Header mode="secondary">Фильтры</Header>}
                  mode="plain"
                >
                  <FiltersBar
                    colors={groups.filters.avatar_color}
                    privacy={groups.filters.closed.map(String)}
                    friends={[]}
                  />
                </Group>
                <Group
                  header={
                    <OnboardingTooltip
                      shown={onboardingStore.currentStep === 1}
                      placement="top"
                      text={"Здесь показаны полученные группы"}
                      onClose={() => onboardingStore.nextStep()}
                    >
                      <Header mode="secondary">Группы</Header>
                    </OnboardingTooltip>
                  }
                  mode="plain"
                >
                  {groupsFiltersStore.displayGroups.length !== 0 ? (
                    <GroupList groups={groupsFiltersStore.displayGroups} />
                  ) : (
                    <Placeholder
                      icon={<Icon56UsersOutline />}
                      header="Сообществ нет:("
                    >
                      Подпишитесь на сообщество или измените настройки
                      фильтрации
                    </Placeholder>
                  )}
                </Group>
              </Group>
            ) : (
              <Placeholder
                icon={<Icon56CancelCircleOutline />}
                header={groups.response.status}
              >
                {groups.response.text}
              </Placeholder>
            )}
          </>
        ) : (
          <PanelSpinner size="large">Идёт загрузка...</PanelSpinner>
        )}
      </Panel>
    </View>
  );
};
