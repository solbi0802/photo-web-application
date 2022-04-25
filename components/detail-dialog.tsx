import { Dialog } from '@blueprintjs/core';

interface Props {
  setShowDialog: (value: boolean) => void;
}

const DetailDialog = (props: Props): JSX.Element => {
  const { setShowDialog } = props;
  return (
    <Dialog
      isOpen={true}
      onClose={(): void => {
        setShowDialog(false);
      }}
      title={'상세 화면'}
    >
      <span>상세</span>
    </Dialog>
  );
};

export default DetailDialog;
