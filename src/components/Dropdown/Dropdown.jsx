import * as Headless from '@headlessui/react'
import clsx from 'clsx'

import { Button } from '../Button/Button'
import { Link } from '../Link/Link'

export function Dropdown(props) {
  return <Headless.Menu {...props} />
}

export function DropdownButton({ as = Button, ...props }) {
  return <Headless.MenuButton as={as} {...props} />
}

export function DropdownMenu({ anchor = 'bottom', className, ...props }) {
  return (
    <Headless.Transition leave="duration-100 ease-in" leaveTo="opacity-0">
      <Headless.MenuItems
        {...props}
        anchor={anchor}
        className={clsx(
          className,
          // Anchor positioning
          '[--anchor-gap:theme(spacing.2)] [--anchor-padding:theme(spacing.1)] data-[anchor~=start]:[--anchor-offset:-6px] data-[anchor~=end]:[--anchor-offset:6px] sm:data-[anchor~=start]:[--anchor-offset:-4px] sm:data-[anchor~=end]:[--anchor-offset:4px]',
          // Base styles
          'isolate w-max rounded-xl p-1',
          // Invisible border that is only visible in `forced-colors` mode for accessibility purposes
          'outline outline-1 outline-transparent focus:outline-none',
          // Handle scrolling when menu won't fit in viewport
          'overflow-y-auto',
          // Popover background
          'bg-white/75 backdrop-blur-xl dark:bg-zinc-800/75',
          // Shadows
          'shadow-lg ring-1 ring-zinc-950/10 dark:ring-inset dark:ring-white/10',
          // Define grid at the menu level if subgrid is supported
          'supports-[grid-template-columns:subgrid]:grid supports-[grid-template-columns:subgrid]:grid-cols-[auto_1fr_1.5rem_0.5rem_auto]'
        )}
      />
    </Headless.Transition>
  )
}

export function DropdownItem({ className, ...props }) {
  let classes = clsx(
    className,
    // Base styles
    'group cursor-default rounded-lg px-3.5 py-2.5 focus:outline-none sm:px-3 sm:py-1.5',
    // Text styles
    'text-left text-base/6 text-zinc-950 sm:text-sm/6 dark:text-white forced-colors:text-[CanvasText]',
    // Focus
    'data-[focus]:bg-blue-500 data-[focus]:text-white',
    // Disabled state
    'data-[disabled]:opacity-50',
    // Forced colors mode
    'forced-color-adjust-none forced-colors:data-[focus]:bg-[Highlight] forced-colors:data-[focus]:text-[HighlightText] forced-colors:[&>[data-slot=icon]]:data-[focus]:text-[HighlightText]',
    // Use subgrid when available but fallback to an explicit grid layout if not
    'col-span-full grid grid-cols-[auto_1fr_1.5rem_0.5rem_auto] items-center supports-[grid-template-columns:subgrid]:grid-cols-subgrid',
    // Icons
    '[&>[data-slot=icon]]:col-start-1 [&>[data-slot=icon]]:row-start-1 [&>[data-slot=icon]]:-ml-0.5 [&>[data-slot=icon]]:mr-2.5 [&>[data-slot=icon]]:size-5 sm:[&>[data-slot=icon]]:mr-2 [&>[data-slot=icon]]:sm:size-4',
    '[&>[data-slot=icon]]:text-zinc-500 [&>[data-slot=icon]]:data-[focus]:text-white [&>[data-slot=icon]]:dark:text-zinc-400 [&>[data-slot=icon]]:data-[focus]:dark:text-white',
    // Avatar
    '[&>[data-slot=avatar]]:-ml-1 [&>[data-slot=avatar]]:mr-2.5 [&>[data-slot=avatar]]:size-6 sm:[&>[data-slot=avatar]]:mr-2 sm:[&>[data-slot=avatar]]:size-5'
  )

  return (
    <Headless.MenuItem>
      {'href' in props ? (
        <Link {...props} className={classes} />
      ) : (
        <button type="button" {...props} className={classes} />
      )}
    </Headless.MenuItem>
  )
}

export function DropdownHeader({ className, ...props }) {
  return <div {...props} className={clsx(className, 'col-span-5 px-3.5 pb-1 pt-2.5 sm:px-3')} />
}

export function DropdownSection({ className, ...props }) {
  return (
    <Headless.MenuSection
      {...props}
      className={clsx(
        className,
        // Define grid at the section level instead of the item level if subgrid is supported
        'col-span-full supports-[grid-template-columns:subgrid]:grid supports-[grid-template-columns:subgrid]:grid-cols-[auto_1fr_1.5rem_0.5rem_auto]'
      )}
    />
  )
}

export function DropdownHeading({ className, ...props }) {
  return (
    <Headless.MenuHeading
      {...props}
      className={clsx(
        className,
        'col-span-full grid grid-cols-[1fr,auto] gap-x-12 px-3.5 pb-1 pt-2 text-sm/5 font-medium text-zinc-500 sm:px-3 sm:text-xs/5 dark:text-zinc-400'
      )}
    />
  )
}

export function DropdownDivider({ className, ...props }) {
  return (
    <Headless.MenuSeparator
      {...props}
      className={clsx(
        className,
        'col-span-full mx-3.5 my-1 h-px border-0 bg-zinc-950/5 sm:mx-3 dark:bg-white/10 forced-colors:bg-[CanvasText]'
      )}
    />
  )
}

export function DropdownLabel({ className, ...props }) {
  return (
    <Headless.Label {...props} data-slot="label" className={clsx(className, 'col-start-2 row-start-1')} {...props} />
  )
}

export function DropdownDescription({ className, ...props }) {
  return (
    <Headless.Description
      data-slot="description"
      {...props}
      className={clsx(
        className,
        'col-span-2 col-start-2 row-start-2 text-sm/5 text-zinc-500 group-data-[focus]:text-white sm:text-xs/5 dark:text-zinc-400 forced-colors:group-data-[focus]:text-[HighlightText]'
      )}
    />
  )
}

export function DropdownShortcut({ keys, className, ...props }) {
  return (
    <Headless.Description
      as="kbd"
      {...props}
      className={clsx(className, 'col-start-5 row-start-1 flex justify-self-end')}
    >
      {(Array.isArray(keys) ? keys : keys.split('')).map((char, index) => (
        <kbd
          key={index}
          className={clsx([
            'min-w-[2ch] text-center font-sans capitalize text-zinc-400 group-data-[focus]:text-white forced-colors:group-data-[focus]:text-[HighlightText]',
            // Make sure key names that are longer than one character (like "Tab") have extra space
            index > 0 && char.length > 1 && 'pl-1',
          ])}
        >
          {char}
        </kbd>
      ))}
    </Headless.Description>
  )
}







// import { useEffect, useRef, useState } from "react";

// const DropdownFour = () => {
//   const [dropdownOpen, setDropdownOpen] = useState(false);

//   const trigger = useRef(null);
//   const dropdown = useRef(null);

//   // close on click outside
//   useEffect(() => {
//     const clickHandler = ({ target }) => {
//       if (!dropdown.current) return;
//       if (
//         !dropdownOpen ||
//         dropdown.current.contains(target) ||
//         trigger.current.contains(target)
//       )
//         return;
//       setDropdownOpen(false);
//     };
//     document.addEventListener("click", clickHandler);
//     return () => document.removeEventListener("click", clickHandler);
//   });

//   // close if the esc key is pressed
//   useEffect(() => {
//     const keyHandler = ({ keyCode }) => {
//       if (!dropdownOpen || keyCode !== 27) return;
//       setDropdownOpen(false);
//     };
//     document.addEventListener("keydown", keyHandler);
//     return () => document.removeEventListener("keydown", keyHandler);
//   });

//   return (
//     <div className="relative h-full">
//       <button
//         className="shadow-11 float-right inline-flex items-center gap-1.5 text-[#464E5F] "
//         ref={trigger}
//         onClick={() => setDropdownOpen(!dropdownOpen)}
//       >
//         Action
//         <svg
//           className="fill-current"
//           width="16"
//           height="16"
//           viewBox="0 0 16 16"
//           fill="none"
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <path
//             d="M8.00039 11.4C7.85039 11.4 7.72539 11.35 7.60039 11.25L1.85039 5.60005C1.62539 5.37505 1.62539 5.02505 1.85039 4.80005C2.07539 4.57505 2.42539 4.57505 2.65039 4.80005L8.00039 10.025L13.3504 4.75005C13.5754 4.52505 13.9254 4.52505 14.1504 4.75005C14.3754 4.97505 14.3754 5.32505 14.1504 5.55005L8.40039 11.2C8.27539 11.325 8.15039 11.4 8.00039 11.4Z"
//             fill=""
//           />
//         </svg>
//       </button>
//       <div
//         ref={dropdown}
//         onFocus={() => setDropdownOpen(true)}
//         onBlur={() => setDropdownOpen(false)}
//         className={`max-w-39.5 shadow-12 absolute right-0 top-full z-1 mt-1 w-full rounded-[5px] bg-white py-2.5  ${
//           dropdownOpen === true ? "block" : "hidden"
//         }`}
//       >
//         <button className="flex w-full px-4 py-2 text-sm  hover:text-white hover:bg-[#2E8F96]">
//           Edit
//         </button>
//         <button className="flex w-full px-4 py-2 text-sm   hover:text-white hover:bg-[#2E8F96]">
//           Delete
//         </button>
//         {/* <button className="flex w-full px-4 py-2 text-sm hover:bg-whiter hover:text-primary dark:hover:bg-meta-4">
//           Details
//         </button> */}
//       </div>
//     </div>
//   );
// };

// export default DropdownFour;
