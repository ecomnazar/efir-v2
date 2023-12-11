import { Switch } from '@headlessui/react'
import { TBoolean } from '../../../interfaces/IGlobal'

interface ISwitchButton {
  enabled: TBoolean;
  handleChange: () => void;
}


const SwitchButton = ({ enabled, handleChange }: ISwitchButton) => {
    return (
        <Switch
        checked={enabled}
        onChange={handleChange}
        className={`${
          enabled ? 'bg-blue-600' : 'bg-gray-200'
        } relative inline-flex h-6 w-11 items-center rounded-full`}
      >
        <span className="sr-only">Enable notifications</span>
        <span
          className={`${
            enabled ? 'translate-x-6' : 'translate-x-1'
          } inline-block h-4 w-4 transform rounded-full bg-white transition`}
        />
      </Switch>
  )
}

export default SwitchButton