import { useState } from 'react'

function App() {
  const [tasks, setTasks] = useState([])
  const [newTask, setNewTask] = useState('')
  
  const addTask = () => {
    if (!newTask.trim()) return
    
    const task = {
      _id: Date.now().toString(),
      text: newTask.trim(),
      completed: false
    }
    
    setTasks([task, ...tasks])
    setNewTask('')
  }
  
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTask()
    }
  }
  
  const toggleTask = (taskId, currentStatus) => {
    setTasks(tasks.map(task => 
      task._id === taskId ? { ...task, completed: !currentStatus } : task
    ))
  }
  
  const deleteTask = (taskId) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return
    setTasks(tasks.filter(task => task._id !== taskId))
  }
  
  const completedTasks = tasks.filter(task => task.completed)
  const pendingTasks = tasks.filter(task => !task.completed)
  
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '40px 20px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
    }}>
      <div style={{
        maxWidth: '800px',
        margin: '0 auto'
      }}>
        {/* Header */}
        <header style={{
          textAlign: 'center',
          marginBottom: '40px',
          animation: 'fadeInDown 0.6s ease-out'
        }}>
          <div style={{
            fontSize: '48px',
            marginBottom: '10px'
          }}>✓</div>
          <h1 style={{
            fontSize: '42px',
            fontWeight: '700',
            color: '#ffffff',
            margin: '0 0 10px 0',
            textShadow: '0 2px 10px rgba(0,0,0,0.2)'
          }}>My Todo List</h1>
          <p style={{
            color: 'rgba(255,255,255,0.9)',
            fontSize: '16px',
            margin: 0
          }}>Stay organized and productive</p>
        </header>
        
        {/* Add Task Section */}
        <div style={{
          marginBottom: '30px',
          animation: 'fadeInUp 0.6s ease-out'
        }}>
          <div style={{
            display: 'flex',
            gap: '12px',
            background: 'rgba(255,255,255,0.95)',
            padding: '8px',
            borderRadius: '16px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.15)'
          }}>
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="What needs to be done today?"
              style={{
                flex: 1,
                padding: '16px 20px',
                border: 'none',
                borderRadius: '12px',
                fontSize: '16px',
                outline: 'none',
                background: 'transparent',
                color: '#2d3748'
              }}
            />
            <button 
              onClick={addTask}
              disabled={!newTask.trim()}
              style={{
                padding: '16px 32px',
                background: newTask.trim() ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : '#cbd5e0',
                color: '#ffffff',
                border: 'none',
                borderRadius: '12px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: newTask.trim() ? 'pointer' : 'not-allowed',
                transition: 'all 0.3s ease',
                boxShadow: newTask.trim() ? '0 4px 15px rgba(102, 126, 234, 0.4)' : 'none'
              }}
              onMouseEnter={(e) => {
                if (newTask.trim()) {
                  e.target.style.transform = 'translateY(-2px)'
                  e.target.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.6)'
                }
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)'
                e.target.style.boxShadow = newTask.trim() ? '0 4px 15px rgba(102, 126, 234, 0.4)' : 'none'
              }}
            >
              Add Task
            </button>
          </div>
        </div>
        
        {/* Stats Bar */}
        {tasks.length > 0 && (
          <div style={{
            display: 'flex',
            gap: '15px',
            marginBottom: '25px',
            animation: 'fadeIn 0.5s ease-out'
          }}>
            <div style={{
              flex: 1,
              background: 'rgba(255,255,255,0.95)',
              padding: '20px',
              borderRadius: '12px',
              textAlign: 'center',
              boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
            }}>
              <div style={{
                fontSize: '28px',
                fontWeight: '700',
                color: '#667eea',
                marginBottom: '5px'
              }}>{pendingTasks.length}</div>
              <div style={{
                fontSize: '14px',
                color: '#718096',
                fontWeight: '500'
              }}>Pending</div>
            </div>
            <div style={{
              flex: 1,
              background: 'rgba(255,255,255,0.95)',
              padding: '20px',
              borderRadius: '12px',
              textAlign: 'center',
              boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
            }}>
              <div style={{
                fontSize: '28px',
                fontWeight: '700',
                color: '#48bb78',
                marginBottom: '5px'
              }}>{completedTasks.length}</div>
              <div style={{
                fontSize: '14px',
                color: '#718096',
                fontWeight: '500'
              }}>Completed</div>
            </div>
          </div>
        )}
        
        {/* Tasks List */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '25px'
        }}>
          {/* Pending Tasks */}
          {pendingTasks.length > 0 && (
            <div style={{
              background: 'rgba(255,255,255,0.95)',
              borderRadius: '16px',
              padding: '25px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
              animation: 'fadeInUp 0.6s ease-out'
            }}>
              <h2 style={{
                fontSize: '20px',
                fontWeight: '700',
                color: '#2d3748',
                margin: '0 0 20px 0',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}>
                <span style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: '#667eea'
                }}></span>
                Pending Tasks
              </h2>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px'
              }}>
                {pendingTasks.map(task => (
                  <TaskItem
                    key={task._id}
                    task={task}
                    onToggle={toggleTask}
                    onDelete={deleteTask}
                  />
                ))}
              </div>
            </div>
          )}
          
          {/* Completed Tasks */}
          {completedTasks.length > 0 && (
            <div style={{
              background: 'rgba(255,255,255,0.95)',
              borderRadius: '16px',
              padding: '25px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
              animation: 'fadeInUp 0.7s ease-out'
            }}>
              <h2 style={{
                fontSize: '20px',
                fontWeight: '700',
                color: '#2d3748',
                margin: '0 0 20px 0',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}>
                <span style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: '#48bb78'
                }}></span>
                Completed Tasks
              </h2>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px'
              }}>
                {completedTasks.map(task => (
                  <TaskItem
                    key={task._id}
                    task={task}
                    onToggle={toggleTask}
                    onDelete={deleteTask}
                  />
                ))}
              </div>
            </div>
          )}
          
          {/* Empty State */}
          {tasks.length === 0 && (
            <div style={{
              background: 'rgba(255,255,255,0.95)',
              borderRadius: '16px',
              padding: '60px 20px',
              textAlign: 'center',
              boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
              animation: 'fadeIn 0.6s ease-out'
            }}>
              <div style={{
                fontSize: '64px',
                marginBottom: '20px',
                opacity: 0.5
              }}>📝</div>
              <p style={{
                color: '#718096',
                fontSize: '18px',
                margin: 0,
                fontWeight: '500'
              }}>No tasks yet. Add your first task to get started!</p>
            </div>
          )}
        </div>
      </div>
      
      {/* CSS Animations */}
      <style>{`
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-10px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  )
}

// Task Item Component
function TaskItem({ task, onToggle, onDelete }) {
  const [isHovered, setIsHovered] = useState(false)
  
  return (
    <div 
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px 20px',
        background: task.completed ? '#f7fafc' : '#ffffff',
        border: `2px solid ${task.completed ? '#e2e8f0' : '#edf2f7'}`,
        borderRadius: '12px',
        transition: 'all 0.3s ease',
        cursor: 'pointer',
        animation: 'slideIn 0.3s ease-out',
        transform: isHovered ? 'translateX(5px)' : 'translateX(0)',
        boxShadow: isHovered ? '0 4px 12px rgba(0,0,0,0.1)' : '0 2px 4px rgba(0,0,0,0.05)'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '15px',
        flex: 1
      }}>
        <button
          onClick={() => onToggle(task._id, task.completed)}
          style={{
            width: '24px',
            height: '24px',
            borderRadius: '50%',
            border: task.completed ? '2px solid #48bb78' : '2px solid #cbd5e0',
            background: task.completed ? '#48bb78' : 'transparent',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            flexShrink: 0
          }}
          onMouseEnter={(e) => {
            if (!task.completed) {
              e.target.style.borderColor = '#667eea'
              e.target.style.background = 'rgba(102, 126, 234, 0.1)'
            }
          }}
          onMouseLeave={(e) => {
            if (!task.completed) {
              e.target.style.borderColor = '#cbd5e0'
              e.target.style.background = 'transparent'
            }
          }}
        >
          {task.completed && (
            <span style={{
              color: '#ffffff',
              fontSize: '14px',
              fontWeight: '700'
            }}>✓</span>
          )}
        </button>
        <span style={{
          flex: 1,
          fontSize: '16px',
          color: task.completed ? '#a0aec0' : '#2d3748',
          textDecoration: task.completed ? 'line-through' : 'none',
          fontWeight: task.completed ? '400' : '500',
          transition: 'all 0.3s ease'
        }}>
          {task.text}
        </span>
      </div>
      <button
        onClick={() => onDelete(task._id)}
        style={{
          width: '32px',
          height: '32px',
          borderRadius: '8px',
          border: 'none',
          background: 'transparent',
          color: '#cbd5e0',
          fontSize: '24px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.3s ease',
          marginLeft: '10px'
        }}
        onMouseEnter={(e) => {
          e.target.style.background = '#fed7d7'
          e.target.style.color = '#e53e3e'
        }}
        onMouseLeave={(e) => {
          e.target.style.background = 'transparent'
          e.target.style.color = '#cbd5e0'
        }}
      >
        ×
      </button>
    </div>
  )
}

export default App