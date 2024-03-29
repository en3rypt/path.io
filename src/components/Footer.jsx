import React from 'react'

function Footer() {
  return (
    <div className="flex flex-col  justify-center items-center">
      <a href="https://github.com/en3rypt/path.io">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
              <rect width="64" height="64" fill="url(#pattern0)"/>
              <defs>
                  <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
                      <use xlinkHref="#image0_502_2" transform="scale(0.0104167)"/>
                  </pattern>
                  <image id="image0_502_2" width="64" height="64" xlinkHref="data:image/png;base64,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"/>
              </defs>
          </svg>
      </a>
      <div className='flex flex-row gap-1 font-mono'>
                            
                        <p> A <a href='https://github.com/jassuwu' target='_blank' className='underline font-semibold'>
                                jass
                            </a> && &#8203;
                            <a href='https://github.com/en3rypt' target='_blank' className='underline font-semibold'>
                                en3rypt
                            </a> product.
                        </p>
                    </div>
    </div>
  )
}

export default Footer