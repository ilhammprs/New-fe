import React from "react"

const Rating = ({value, color}) => {
    return (
        <div className="rating">
            <span>
                <i
                  style={{ color }}
                  className={
                  value >= 1? `fas fa-start` : value>= 0.5 ? `fas fa-start-half-alt` : `far fa-start`
                }
                />
            </span>
            <span>
                <i
                  style={{ color }}
                  className={
                  value >= 2? `fas fa-start` : value>= 1.5 ? `fas fa-start-half-alt` : `far fa-start`
                }
                />
            </span>
            <span>
                <i
                  style={{ color }}
                  className={
                  value >= 3? `fas fa-start` : value>= 2.5 ? `fas fa-start-half-alt` : `far fa-start`
                }
                />
            </span>
            <span>
                <i
                  style={{ color }}
                  className={
                  value >= 4? `fas fa-start` : value>= 3.5 ? `fas fa-start-half-alt` : `far fa-start`
                }
                />
            </span>
            <span>
                <i
                  style={{ color }}
                  className={
                  value >= 5? `fas fa-start` : value>= 4.5 ? `fas fa-start-half-alt` : `far fa-start`
                }
                />
            </span>
            <span>
                <i
                  style={{ color }}
                  className={
                  value >= 1? `fas fa-start` : value>= 0.5 ? `fas fa-start-half-alt` : `far fa-start`
                }
                />
            </span>
        </div>
    )
}

export default Rating