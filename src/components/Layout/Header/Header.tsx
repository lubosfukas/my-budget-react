import { useState } from "react";
import { MoreOutlined } from "@ant-design/icons";
import { Button, Layout, PageHeader } from "antd";
import { useSearchParams } from "react-router-dom";

import { useFetchAccounts } from "../../../hooks";
import { ACCOUNT_KEY } from "../../../utils/constants";
import { AddExpenseIncomeModal } from "../../AddExpenseIncomeModal";
import { AddTransferModal } from "../../AddTransferModal";
import styles from "./Header.module.less";

const { Header: HeaderAntd } = Layout;

export const Header = ({ onClick }: { onClick: () => void }) => {
  const [expenseIncomeModalOpen, setExpenseIncomeModalOpen] = useState(false);
  const [transferModalOpen, setTransferModalOpen] = useState(false);

  const { data = [] } = useFetchAccounts();

  const [searchParams] = useSearchParams();
  const account = searchParams.get(ACCOUNT_KEY) ?? undefined;

  return (
    <>
      <HeaderAntd className={styles.header} style={{ height: "65px", backgroundColor: "white" }}>
        <PageHeader
          extra={[
            <Button key="3" type="primary" onClick={() => setExpenseIncomeModalOpen(true)}>
              Add expense/income
            </Button>,
            <Button disabled={data.length === 0} key="2" onClick={() => setTransferModalOpen(true)}>
              Add transfer
            </Button>,
            <Button key="1" shape="circle" icon={<MoreOutlined />} onClick={onClick} />,
          ]}
          subTitle={account?.toUpperCase()}
          title="Dashboard"
          style={{ width: "100%", padding: "12px 0" }}
        />
      </HeaderAntd>

      {expenseIncomeModalOpen && (
        <AddExpenseIncomeModal visible={expenseIncomeModalOpen} onClose={() => setExpenseIncomeModalOpen(false)} />
      )}
      {transferModalOpen && (
        <AddTransferModal accounts={data} visible={transferModalOpen} onClose={() => setTransferModalOpen(false)} />
      )}
    </>
  );
};
