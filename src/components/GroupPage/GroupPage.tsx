import {
  Checkbox,
  FormItem,
  Group,
  Header,
  Panel,
  PanelHeader,
  PanelSpinner,
  Placeholder,
  Separator,
  Spacing,
  SubnavigationBar,
  SubnavigationButton,
  View,
} from "@vkontakte/vkui";
import Styles from "./GroupPage.module.css";
import { GroupList } from "../GroupList/GroupList";
import { useGroups } from "../../utils/hooks/group";
import { Icon56UsersOutline } from "@vkontakte/icons";
const FILTERS_STYLE = [
  { value: "Вечерний", label: "Вечерний" },
  { value: "Деловой", label: "Деловой" },
  { value: "Повседневный", label: "Повседневный" },
  { value: "Спортивный", label: "Спортивный" },
];
export const GroupPage = () => {
  const groups = useGroups();
  console.log(groups);
  return (
    <View activePanel="groups">
      <Panel id="groups" aria-live="polite" aria-busy={groups === undefined}>
        <PanelHeader />
        {!groups.response ? (
          <PanelSpinner size="large">Идёт загрузка...</PanelSpinner>
        ) : (
          <Group header={<Header mode="secondary">Мои группы</Header>}>
            {groups.data.length === 0 ? (
              <Placeholder icon={<Icon56UsersOutline />}>
                Сообществ пока нет:(
              </Placeholder>
            ) : (
              <>
                <SubnavigationBar>
                  <FormItem top="Цвета">
                    <div className={Styles.CheckboxesWrapper}>
                      {groups.colors.map((color) => {
                        return (
                          <Checkbox key={color} value={color}>
                            {color === "all" ? (
                              <span>Все</span>
                            ) : (
                              <div
                                style={{
                                  backgroundColor: color,
                                }}
                                className={Styles.CheckboxColor}
                              ></div>
                            )}
                          </Checkbox>
                        );
                      })}
                    </div>
                  </FormItem>
                  <FormItem top="Тип приватности">
                    <div className={Styles.CheckboxesWrapper}>
                      {groups.privacy.map((privacyItem, index) => {
                        return (
                          <Checkbox key={index} value={privacyItem.toString()}>
                            <span>
                              {privacyItem === "all"
                                ? "Все"
                                : privacyItem
                                ? "Закрытые"
                                : "Открытые"}
                            </span>
                          </Checkbox>
                        );
                      })}
                    </div>
                  </FormItem>
                </SubnavigationBar>
                <SubnavigationBar>
                  <SubnavigationButton>
                    В группе есть мои друзья
                  </SubnavigationButton>
                </SubnavigationBar>
                <Spacing size={24}>
                  <Separator />
                </Spacing>
                <GroupList groups={groups.data} />
              </>
            )}
          </Group>
        )}
      </Panel>
    </View>
  );
};
