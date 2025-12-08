export interface IActionDef {
  label: string
  icon: string
  severity?: 'success' | 'info' | 'warning' | 'danger' | 'help' | 'primary' | 'secondary' | 'contrast'
  handler: (row: any) => void
  allowActivate?: (row: any) => boolean
  static?: boolean
}
