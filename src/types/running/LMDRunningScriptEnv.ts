import LMDEnv from "./LMDEnv"

export default interface LMDRunningScriptEnv extends LMDEnv {

  _VERSION_DETECTABLE: string

  _VERSION_DETECT_TYPE: string

  _MAC_INSTALL_PATH: string

  _MAC_INSTALL_TARGET_FILE_NAME: string

  _MAC_INSTALLER_FILE_NAME: string

  _WINDOWS_INSTALL_PATH: string

  _WINDOWS_INSTALL_TARGET_FILE_NAME: string

  _WINDOWS_INSTALLER_FILE_NAME: string

}
