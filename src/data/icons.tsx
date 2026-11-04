import {
  BatteryChargeIcon,
  BottleIcon,
  CameraIcon,
  HeadphonesRoundSoundIcon,
  LampIcon,
  SpeakerIcon,
  StickerSmileCircleIcon,
  TShirtIcon,
  UsbIcon,
} from '@solar-icons/react/bold'
import type { ComponentType } from 'react'

// Each product's picture is a Solar icon, keyed by `icon` in catalogue.json.
export const productIcons: Record<string, ComponentType<{ className?: string }>> = {
  'power-bank': BatteryChargeIcon,
  earbuds: HeadphonesRoundSoundIcon,
  'selfie-stick': CameraIcon,
  'ring-light': LampIcon,
  'usb-hub': UsbIcon,
  speaker: SpeakerIcon,
  't-shirt': TShirtIcon,
  stickers: StickerSmileCircleIcon,
  bottle: BottleIcon,
}
