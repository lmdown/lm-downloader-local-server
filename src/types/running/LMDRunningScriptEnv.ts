import LMDEnv from "./LMDEnv"

export default interface LMDRunningScriptEnv extends LMDEnv {

  _VERSION_DETECTABLE: string

  _MAC_INSTALL_PATH: string

  _MAC_INSTALL_FILE_NAME: string

}
