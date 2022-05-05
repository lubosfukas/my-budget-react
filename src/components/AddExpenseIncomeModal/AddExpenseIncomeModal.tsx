import { Modal, Tabs } from "antd";
import { useState } from "react";

import { Category } from "../../types";
import { Content } from "./Content";

const { TabPane } = Tabs;

type Props = {
  visible: boolean;
  onClose: () => void;
};

const categories: Array<Category> = [
  {
    key: "entertainment",
    label: "Entertainment",
  },
  {
    key: "housing",
    label: "Housing",
  },
  {
    key: "transportation",
    label: "Transportation",
  },
];

const tabs = [
  {
    key: "expense",
    label: "Add expense",
  },
  {
    key: "income",
    label: "Add income",
  },
];

export const AddExpenseIncomeModal = ({ visible, onClose }: Props) => {
  const [selectedTab, setSelectedTab] = useState(tabs[0].key);
  const [balance, setBalance] = useState(0);
  const [category, setCategory] = useState(categories[0].key);
  const [date, setDate] = useState(new Date());
  const [note, setNote] = useState("");

  return (
    <Modal
      centered
      destroyOnClose
      okButtonProps={{ disabled: balance === 0 }}
      okText="Add"
      visible={visible}
      width={300}
      onCancel={onClose}
      onOk={onClose}
    >
      <Tabs activeKey={selectedTab} type="card" onChange={(activeKey) => setSelectedTab(activeKey)}>
        {tabs.map(({ key, label }) => (
          <TabPane key={key} tab={label}>
            <Content
              balance={balance}
              categories={categories}
              category={category}
              date={date}
              note={note}
              setBalance={setBalance}
              setCategory={setCategory}
              setDate={setDate}
              setNote={setNote}
            />
          </TabPane>
        ))}
      </Tabs>
    </Modal>
  );
};
