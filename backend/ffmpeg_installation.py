import os
import sys
import ctypes
import subprocess
import urllib.request
import time

# Function to check if the script is running as administrator
def is_admin():
    try:
        return ctypes.windll.shell32.IsUserAnAdmin()
    except:
        return False

# Function to download and install Chocolatey
def install_chocolatey():
    print("Downloading Chocolatey installation script...")
    choco_install_script = "https://community.chocolatey.org/install.ps1"
    try:
        # Download the Chocolatey installation script
        urllib.request.urlretrieve(choco_install_script, "install.ps1")
        print("Chocolatey installation script downloaded successfully.")

        # Run the installation script using PowerShell
        print("Installing Chocolatey...")
        subprocess.run(["powershell", "-ExecutionPolicy", "Bypass", "-File", "install.ps1"], shell=True)
        print("Chocolatey installed successfully.")
        time.sleep(5)
    except Exception as e:
        print(f"Failed to install Chocolatey: {e}")
        print("Please manually install Chocolatey from https://chocolatey.org/install.")
        time.sleep(5)
    finally:
        # Clean up the installation script
        if os.path.exists("install.ps1"):
            os.remove("install.ps1")
            print("Temporary installation script removed.")
            time.sleep(5)

def add_chocolatey_to_path():
    # Chocolatey's bin directory
    choco_path = r"C:\ProgramData\chocolatey\bin"

    # Check if the directory exists
    if not os.path.exists(choco_path):
        print(f"Chocolatey directory not found at {choco_path}.")
        print("Please ensure Chocolatey is installed correctly.")
        return

    # Get the current PATH environment variable
    path = os.environ.get('PATH', '')

    # Check if Chocolatey is already in the PATH
    if choco_path in path:
        print("Chocolatey is already in the PATH.")
        return

    # Add Chocolatey to the PATH
    print(f"Adding {choco_path} to the PATH environment variable...")
    os.environ['PATH'] = f"{choco_path};{path}"
    subprocess.run(['setx', 'PATH', os.environ['PATH']], shell=True)
    print("Chocolatey added to PATH successfully.")

# Function to install FFmpeg using Chocolatey
def install_ffmpeg():
    print("Installing FFmpeg using Chocolatey...")
    try:
        # Use Chocolatey to install FFmpeg
        subprocess.run(["choco", "install", "ffmpeg", "-y"], shell=True)
        print("FFmpeg installed successfully.")
        time.sleep(2)
    except Exception as e:
        print(f"Failed to install FFmpeg: {e}")
        print("Please manually install FFmpeg using Chocolatey.")
        sys.exit(1)  # Exit the script if FFmpeg installation fails

# Function to add FFmpeg to the system's PATH environment variable
def add_ffmpeg_to_path():
    # FFmpeg's bin directory
    ffmpeg_path = r"C:\ProgramData\chocolatey\lib\ffmpeg\tools\ffmpeg\bin"

    # Check if the directory exists
    if not os.path.exists(ffmpeg_path):
        print(f"FFmpeg directory not found at {ffmpeg_path}.")
        print("Please ensure FFmpeg is installed correctly.")
        sys.exit(1)  # Exit the script if FFmpeg is not found

    # Get the current PATH environment variable
    path = os.environ.get('PATH', '')

    # Check if FFmpeg is already in the PATH
    if ffmpeg_path in path:
        print("FFmpeg is already in the PATH.")
        return

    # Add FFmpeg to the PATH
    print(f"Adding {ffmpeg_path} to the PATH environment variable...")
    os.environ['PATH'] = f"{ffmpeg_path};{path}"
    subprocess.run(['setx', 'PATH', os.environ['PATH']], shell=True)
    print("FFmpeg added to PATH successfully.")
    time.sleep(2)

if __name__ == "__main__":
    # Check if the script is running as administrator
    if not is_admin():
        print("This script requires administrative privileges.")
        print("Please re-run the script as an administrator.")
        # Restart the script with administrative privileges
        ctypes.windll.shell32.ShellExecuteW(None, "runas", sys.executable, " ".join(sys.argv), None, 1)
        exit(0)

    # If running as administrator, proceed with the installation
    install_chocolatey()
    add_chocolatey_to_path()
    install_ffmpeg()
    add_ffmpeg_to_path()