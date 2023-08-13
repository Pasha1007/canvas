import React, { useRef, useEffect, useState } from 'react'
import '../App.css';
const Canvas = props => {
    const [circles, setCircles] = useState([]);

    const canvasRef = useRef(null)

    useEffect(() => {
        const draw = (ctx, frameCount) => {
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
            circles.forEach((circle) => {
                const { radius, x, y, directionX, directionY } = circle;
                const newX = x + directionX;
                const newY = y + directionY;

                if (newX < radius || newX > ctx.canvas.width - radius) {
                    circle.directionX *= -1;
                }
                if (newY < radius || newY > ctx.canvas.height - radius) {
                    circle.directionY *= -1;
                }

                circle.x = newX;
                circle.y = newY;
                ctx.fillStyle = 'blue';
                ctx.beginPath();
                ctx.arc(newX, newY, radius, 0, 2 * Math.PI);
                ctx.fill();
            })
        }
        const canvas = canvasRef.current
        const context = canvas.getContext('2d')
        let frameCount = 1
        let animationFrameId
        canvas.width = 400;
        canvas.height = 500;

        const render = () => {
            frameCount++
            draw(context, frameCount)
            animationFrameId = window.requestAnimationFrame(render)
        }
        render()

        return () => {
            window.cancelAnimationFrame(animationFrameId)
        }
    }, [circles])
    const addCircle = () => {
        const newCircle = {
            radius: 10,
            x: Math.random() * canvasRef.current.width,
            y: Math.random() * canvasRef.current.height,
            directionX: Math.random() * 2 - 1,
            directionY: Math.random() * 2 - 1

        };
        setCircles([...circles, newCircle]);
    };
    const deleteCircle = () => {
        setCircles([...circles.slice(0, -1)]);
    }
    const clearCanvas = () => {
        setCircles([]);
    }

    return (
        <div className='canvasContainer'>
            <canvas className='canvasBlock' ref={canvasRef} {...props}></canvas>
            <button onClick={addCircle}>Add Circle</button>
            <button onClick={deleteCircle}>Delete Circle</button>
            <button onClick={clearCanvas}>Clear zone</button>
        </div>
    )
}

export default Canvas