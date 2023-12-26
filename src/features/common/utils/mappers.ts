
import type { Option } from '../components/ui/Form/SelectField'


export interface ApiOption {
  id: number
  name: string
  isActive?: boolean
}

export const mapApiOptionToFormOption = (option: ApiOption): Option => ({
  label: option.name,
  value: option.id
})
