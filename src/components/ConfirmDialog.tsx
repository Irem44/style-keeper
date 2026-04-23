interface ConfirmDialogProps {
  onClose: () => void;
  onConfirm: () => void;
  isOpen: boolean;
  title: string;
  buttonTitle: string;
}

const ConfirmDialog = ({
  onClose,
  onConfirm,
  isOpen,
  title,
  buttonTitle,
}: ConfirmDialogProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Diyalog Kutusu */}
      <div className="relative bg-white p-8 rounded-3xl shadow-2xl w-85 flex flex-col items-center text-center gap-6 border-2 border-[#F39CC1]">
        <h1 className="text-[#D22E74] font-bold text-2xl">{title}</h1>

        <p className="text-gray-600">Bu işlem geri alınamaz emin misiniz!</p>

        <div className="flex gap-4 w-full">
          {/* Vazgeç Butonu */}
          <button
            onClick={onClose}
            className="flex-1 py-2 rounded-full border border-gray-300 text-gray-500 hover:bg-gray-50 transition-colors"
          >
            Vazgeç
          </button>

          {/* Onayla/Sil Butonu */}
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="flex-1 py-2 rounded-full bg-[#D22E74] text-white font-bold hover:bg-[#b02661] transition-colors"
          >
            {buttonTitle}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
