import {
  Checkbox,
  Div,
  FormItem,
  FormLayoutGroup,
  Group,
  Header,
  Panel,
  PanelHeader,
  PanelSpinner,
  Placeholder,
  Separator,
  Spacing,
  Subhead,
  SubnavigationBar,
  View,
} from "@vkontakte/vkui";
import Styles from "./GroupPage.module.css";
import { GroupList } from "../GroupList/GroupList";
import { useGroups } from "../../utils/hooks/group";
import { Icon56UsersOutline } from "@vkontakte/icons";

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
                  <Div className={Styles.ColorWrapper}>
                    <Subhead>Цвет аватарки</Subhead>
                    <FormLayoutGroup mode="horizontal">
                      <Div className={Styles.ColorWrapper}>
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
                      </Div>
                    </FormLayoutGroup>
                    <FormLayoutGroup>
                      <Subhead>Тип приватности</Subhead>
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
                    </FormLayoutGroup>
                    <FormLayoutGroup>
                      <Subhead>Наличие друзей</Subhead>
                      <Checkbox value={"false"} onClick={() => {}}>
                        В группе есть мои друзья
                      </Checkbox>
                    </FormLayoutGroup>
                  </Div>
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
