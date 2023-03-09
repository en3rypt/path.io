import React,{Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
const algorithms = [
  { name: 'Breadth First Search' },
  { name: 'Depth First Search' },
  { name: 'Depth Limited Search' },
  { name: 'Iterative deepening depth-first search' },
  { name: 'Bi-Directional Search' },
]

export default function DropDown(props) {
  const [selected, setSelected] = useState(algorithms[0])

  return (
    <></>
  )
}
