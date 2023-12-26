import type { Option } from '@/features/common/components/ui/Form/SelectField'
import { BlobOptions } from 'buffer'
  
  interface GetDefaultSelectOptionParams {
    valueAsNumber?: boolean
  }
  export const getDefaultSelectOption = (params: GetDefaultSelectOptionParams = {}, defaultLabel: string): Option => ({
    label: defaultLabel,
    value: params.valueAsNumber ? -1 : ''
  })