import { useClientContext } from "@/hooks";
import { MetamaskMissingModal } from "@/components/MetamaskMissingModal";

export const HocPokemonPage = ({ children }) => {
  const { openInstallMetamask, setOpenInstallMetamask } = useClientContext();

  return (
    <>
      <MetamaskMissingModal openModal={openInstallMetamask} setOpenModal={setOpenInstallMetamask} />
      {children}
    </>
  )
}